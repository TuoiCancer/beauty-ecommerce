import nodemailer from 'nodemailer'

const email = process.env.EMAIL_NODE
const password = process.env.PASSWORD_NODE

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: email,
		pass: password
	}
})

export const mailOption = {
	from: email,
	to: email
}
