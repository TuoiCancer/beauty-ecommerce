'use client'
import { useStore } from '@/store'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

const ShowErr = () => {
	const { UserSlice } = useStore()
	if (UserSlice.isError) {
		toast.error(UserSlice.errorMess)
	}
	return <ToastContainer />
}

export default ShowErr
