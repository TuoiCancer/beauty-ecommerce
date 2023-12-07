'use client'
import { useStore } from '@/store'
import { useRouter } from 'next/navigation'
import React, { use, useEffect } from 'react'
import Loading from './loading'

const ContainerComponent = () => {
	const route = useRouter()
	const { UserSlice } = useStore()

	// useEffect(() => {
	// 	if (UserSlice.isLoggedIn && UserSlice.user.role === 'SHOP') {
	// 		route.push('/admin/dashboard')
	// 	} else {
	// 		route.push('/user/home')
	// 	}
	// }, [UserSlice])

	return <Loading />
}

export default ContainerComponent
