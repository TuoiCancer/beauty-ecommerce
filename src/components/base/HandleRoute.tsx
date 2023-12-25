'use client'
import React, { useEffect } from 'react'
import { useStore } from '@/store'
import { useRefreshToken } from '@/service/react-query/user.query'
import { useGetCartByUserId } from '@/service/react-query/cart.query'
import { useRouter } from 'next/navigation'
const HandleRoute = ({ children }: { children: React.ReactNode }) => {
	const route = useRouter()
	const { UserSlice, AuthSlice } = useStore()

	const { mutate: refreshToken } = useRefreshToken()

	const { mutate: getCartByUserId } = useGetCartByUserId()

	useEffect(() => {
		const isRemember = localStorage.getItem('rememberPassword') === 'true'
		const data = localStorage.getItem('data')

		if (!data) {
			console.log('data', data)

			UserSlice.setTotalProductInCart(0)
			UserSlice.setIsLoggedIn(false)
			// set token to null
			AuthSlice.setAccessToken(null)
			AuthSlice.setRefreshToken(null)
			route.push('/user/home')
		} else {
			// check token is expired or not
			const { maxAge } = JSON.parse(data)?.token
			const maxAgeDate = new Date(maxAge).getTime()
			const now = new Date().getTime()
			if (now > maxAgeDate) {
				if (isRemember) {
					// call api  refresh token
					refreshToken()
				} else {
					UserSlice.setTotalProductInCart(0)
					UserSlice.setIsLoggedIn(false)
					// set token to null
					AuthSlice.setAccessToken(null)
					AuthSlice.setRefreshToken(null)
					// route.push('/user/home')
				}
			}
		}
	}, [])

	useEffect(() => {
		if (UserSlice.user?.id) {
			getCartByUserId({
				userId: UserSlice.user?.id
			})
		}
	}, [UserSlice.user])

	return <>{children}</>
}

export default HandleRoute
