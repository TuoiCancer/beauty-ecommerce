'use client'
import { useStore } from '@/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Loading from './loading'

const ContainerComponent = () => {
	const { UserSlice, AuthSlice } = useStore()

	const route = useRouter()

	useEffect(() => {
		if (!UserSlice.isLoggedIn) {
			UserSlice.setTotalProductInCart(0)
			// set token to null
			AuthSlice.setAccessToken(null)
			AuthSlice.setRefreshToken(null)
			route.push('/user/home')
		} else {
			if (UserSlice.user.role === 'SHOP') {
				route.push('/admin/dashboard')
			} else {
				route.push('/user/home')
			}
		}
	}, [UserSlice.isLoggedIn])

	return <Loading />
}

export default ContainerComponent
