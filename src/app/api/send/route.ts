import { transporter } from '@/config/nodemailer'
import { NextRequest, NextResponse } from 'next/server'

import * as fs from 'fs'
import { JSDOM } from 'jsdom'
import { ProductInterface } from '@/utils/product.interface'

import * as path from 'path'

export async function POST(req: NextRequest, res: NextResponse) {
	if (req.method === 'POST') {
		const { username, email, order } = await req.json()

		const orderHtml = fs.readFileSync(
			path.join(process.cwd(), '/public/sendMail.html'),
			'utf-8'
		)
		const dom = new JSDOM(orderHtml)

		const containerDiv = dom.window.document.querySelector('.container')
		containerDiv.style.flexDirection = 'column'
		containerDiv.style.justifyContent = 'center'
		containerDiv.style.alignItems = 'center'

		const pStatus = dom.window.document.querySelector('.order_status')
		const pUsername = dom.window.document.querySelector('.username')
		const pAddress = dom.window.document.querySelector('.address')
		const pPrice = dom.window.document.querySelector('.price')

		pStatus.innerHTML = `
		Order: 
		<span
        style="font-weight: 600; color: #1d4a8e;">PENDING
				</span>
		`
		pUsername.innerHTML = `
		User: <span
        style="font-weight: 600; color: #1d4a8e; font-size:16px;">${username}</span>
		`

		pPrice.innerHTML = `
		Total: <span style="font-weight: 600; color: #1d4a8e; font-size:16px;">${order.order_checkout.totalPrice}đ</span>
		`

		pAddress.innerHTML = `
		Address: <span style="font-weight: 600; color: #1d4a8e;">${order.order_shipping}</span>
		`

		const wrapProductDiv = dom.window.document.getElementById('wrap_product')
		wrapProductDiv.style.marginBottom = '16px'
		order.products.forEach((product: ProductInterface) => {
			const divElement = dom.window.document.createElement('div')
			divElement.classList.add('cosmetic-div')
			divElement.style.display = 'flex'
			divElement.innerHTML = `
			<img
          src=${product.product_thumbnail}
          alt="Image Icon"
          style="border-radius:50% ; margin-right: 12px; width: 64px;height: 64px;" />
        <div>
          <ul class="lst2" style=" list-style-type: none; padding: 0.3em 12px; font-size: 16px;">
           <li style="white-space:nowrap">${product.product_name.slice(
							0,
							250
						)}...</li>
            <li>x ${product.quantityToBuy}</li>
          </ul>
        </div>
				`
			wrapProductDiv.appendChild(divElement)
		})

		const personalizedOrderHtml = dom.serialize()

		try {
			await transporter.sendMail({
				from: 'glow&grace@gmail.com', // sender address
				to: email, // list of receivers
				subject: `ORDER #${order.id}, INFORMATION `, // Subject line
				text: 'Hello world?', // plain text body
				html: personalizedOrderHtml // html body
			})
			return NextResponse.json({ message: 'success' })
		} catch (error) {
			console.log('error', error)
			return NextResponse.json({
				message: 'send email failed'
			})
		}
	}
}
