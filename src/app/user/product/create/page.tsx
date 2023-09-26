'use client'
import React, { useState } from 'react'

import { Box, TextField, Button } from '@mui/material'
import { useCreateProduct } from '@/service/react-query/product.query'
import { RMIUploader } from 'react-multiple-image-uploader'

const CreateProductTest = () => {
	const [visible, setVisible] = useState(false)
	const { isLoading, mutate: createProduct } = useCreateProduct()
	const [imgSrc, setImgSrc] = useState('')
	const [file, setFile] = useState<any>(null)
	const [formDataFile, setFormDataFile] = useState<any>(null)
	const [listImg, setListImg] = useState<any>([])
	const handleSetVisible = () => {
		setVisible(true)
	}
	const hideModal = () => {
		setVisible(false)
	}
	const onUpload = (data: any) => {
		createProduct({
			data: data
		})
	}
	const onSelect = (data: any) => {}
	const onRemove = (id: any) => {}

	const showPreview = async (event: any) => {
		const formData = new FormData()
		if (event.target.files.length > 0) {
			const file = event.target.files[0]
			formData.append('file', file)
			setFile(file)
			//form-data
			setFormDataFile(formData)
			//preview
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onloadend = () => {
				setImgSrc(reader.result as string)
			}
		}
	}

	return (
		<Box
			sx={{
				pt: '200px',
				pb: '100px'
			}}
		>
			<RMIUploader
				warnMessage='Warning message'
				onSelect={onSelect}
				onUpload={onUpload}
				onRemove={onRemove}
				dataSources={[]}
			/>
		</Box>
	)
}

export default CreateProductTest
