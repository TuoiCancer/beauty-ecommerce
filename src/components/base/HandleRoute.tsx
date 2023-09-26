'use client'
import React, { useEffect } from 'react'
import { useStore } from '@/store'
import { useRefreshToken } from '@/service/react-query/user.query'
const HandleRoute = () => {
	const { UserSlice } = useStore()

	const { mutate: refreshToken } = useRefreshToken()
	useEffect(() => {
		const data = localStorage.getItem('data')
		const isRemember = localStorage.getItem('rememberPassword') === 'true'

		if (!data) {
			if (!isRemember) {
				UserSlice.setIsLoggedIn(false)
				UserSlice.setTotalProductInCart(0)
				UserSlice.setIsReloadPage(true)
			}
		} else {
			// check token is expired or not
			const re_token = JSON.parse(data)?.token?.refreshToken
			const { maxAge } = JSON.parse(data)?.token
			const maxAgeDate = new Date(maxAge).getTime()
			const now = new Date().getTime()
			if (now > maxAgeDate) {
				if (isRemember) {
					console.log('Your token has expired, please login again')
					// call api  refresh token
					refreshToken({})
				} else {
					UserSlice.setIsLoggedIn(false)
					UserSlice.setTotalProductInCart(0)
					UserSlice.setIsReloadPage(true)
				}
			}
		}
	}, [])

	useEffect(() => {
		if (UserSlice.isReloadPage) {
			console.log('------------RELOADED ----------------')
			UserSlice.setIsReloadPage(false)
			// window.location.reload()
		}
	}, [UserSlice.isReloadPage])
	return <></>
}

export default HandleRoute
