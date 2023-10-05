'use client'
import { useStore } from '@/store'
import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const ShowErr = () => {
	const { UserSlice } = useStore()
	useEffect(() => {
		if (UserSlice.isError) {
			toast.error(UserSlice.errorMess)
			UserSlice.setIsError(false)
		}
		if (UserSlice.isSuccess) {
			toast.success(UserSlice.successMess, {
				position: 'top-center'
			})
			UserSlice.setIsSuccess(false)
		}
	}, [UserSlice])
	return <ToastContainer />
}

export default ShowErr
