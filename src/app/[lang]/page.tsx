'use client'
import { useRouter } from 'next/navigation'
import React, { use, useEffect } from 'react'
import Loading from './loading'

const ContainerComponent = () => {
	const route = useRouter()

	useEffect(() => {
		route.push('/user/home')
	}, [])

	return <Loading />
}

export default ContainerComponent
