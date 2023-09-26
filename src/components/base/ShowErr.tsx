'use client'
import { useStore } from '@/store'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

const ShowErr = () => {
	const { UserSlice } = useStore()
	if (UserSlice.isError) {
		toast.error(UserSlice.errorMess)
		UserSlice.setIsError(false)
	}
	if (UserSlice.isSuccess) {
		toast.success(UserSlice.successMess)
		UserSlice.setIsSuccess(false)
	}
	return <ToastContainer />
}

export default ShowErr
