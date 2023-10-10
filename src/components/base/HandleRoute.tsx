'use client'
import React, { useEffect } from 'react'
import { useStore } from '@/store'
import { useRefreshToken } from '@/service/react-query/user.query'
import { useGetCartByUserId } from '@/service/react-query/cart.query'
const HandleRoute = ({ children }: { children: React.ReactNode }) => {
	const { UserSlice, AuthSlice } = useStore()

	const { mutate: refreshToken } = useRefreshToken()

	const { mutate: getCartByUserId } = useGetCartByUserId()

	useEffect(() => {
		const data = localStorage.getItem('data')
		const isRemember = localStorage.getItem('rememberPassword') === 'true'

		if (!data) {
			UserSlice.setTotalProductInCart(0)
			UserSlice.setIsLoggedIn(false)
			UserSlice.setIsReloadPage(true)
			// set token to null
			AuthSlice.setAccessToken(null)
			AuthSlice.setRefreshToken(null)
			// if (!isRemember) {
			// 	UserSlice.setTotalProductInCart(0)
			// 	UserSlice.setIsLoggedIn(false)
			// 	UserSlice.setIsReloadPage(true)
			// 	// set token to null
			// 	AuthSlice.setAccessToken(null)
			// 	AuthSlice.setRefreshToken(null)
			// }
		} else {
			// check token is expired or not
			const { maxAge } = JSON.parse(data)?.token
			const maxAgeDate = new Date(maxAge).getTime()
			const now = new Date().getTime()
			if (now > maxAgeDate) {
				if (isRemember) {
					// call api  refresh token
					refreshToken({})
				} else {
					UserSlice.setTotalProductInCart(0)
					UserSlice.setIsLoggedIn(false)
					UserSlice.setIsReloadPage(true)
					// set token to null
					AuthSlice.setAccessToken(null)
					AuthSlice.setRefreshToken(null)
				}
			}
		}
	}, [])

	useEffect(() => {
		if (UserSlice.user) {
			getCartByUserId({
				userId: UserSlice.user?.id
			})
		}
	}, [UserSlice.user])

	useEffect(() => {
		if (UserSlice.isReloadPage) {
			UserSlice.setIsReloadPage(false)
			// window.location.reload()
		}
	}, [UserSlice.isReloadPage])

	useEffect(() => {
		if (!UserSlice.isLoggedIn) {
			UserSlice.setTotalProductInCart(0)
			UserSlice.setIsReloadPage(true)
		}
	}, [UserSlice.isLoggedIn])

	return <>{children}</>
}

export default HandleRoute
