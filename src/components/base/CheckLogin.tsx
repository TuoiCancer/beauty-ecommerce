'use client'

import Loading from '@/app/loading'
import { useStore } from '@/store'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const CheckLogin = ({ children }: { children: React.ReactNode }) => {
	const route = useRouter()
	const pathname = usePathname()
	const { UserSlice } = useStore()
	// check maxAge of token and refresh if needed
	//role :  "SHOP"
	useEffect(() => {
		if (UserSlice.isLoggedIn) {
			if (UserSlice.user.role === 'SHOP') {
				route.push('/admin')
			} else {
				route.push('/user/home')
			}
		} else {
			if (pathname.includes('order') || pathname.includes('infor')) {
				route.push('/login')
			}
			if (pathname.includes('admin')) {
				route.push('/login')
			}
		}
	}, [])

	return <>{children}</>
}

export default CheckLogin
