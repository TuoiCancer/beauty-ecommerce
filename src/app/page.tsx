'use client'

import React, { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import Loading from './loading'

const Homepage = () => {
	const route = useRouter()
	const { UserSlice } = useStore()

	// check maxAge of token and refresh if needed
	useEffect(() => {
		if (UserSlice.isLoggedIn) {
			route.push('/user/home')
		} else {
			route.push('/login')
		}
	}, [])
	return <Loading />
}

export default Homepage
