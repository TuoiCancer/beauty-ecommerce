'use client'
import { ibarra, roboto } from '@/assets/font'
import { listBrands, listCategory } from '@/constants'
import {
	Box,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
	ButtonGroup
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import BaseButton from '../base/BaseButton'

const Title = ({ title }: { title: string }) => {
	return (
		<Typography
			variant='h3'
			className={ibarra.className}
			sx={{
				color: '#121212',
				fontSize: { xs: '24px', lg: '32px' },
				fontWeight: 700,
				lineHeight: '125.5%',
				paddingBottom: { md: '18px', lg: '32px' }
			}}
		>
			{title}
		</Typography>
	)
}

const SidebarProduct = ({
	page,
	rowPerPage,
	category,
	setCategory,
	brand,
	searchKey,
	setBrand,
	sorting,
	setSorting,
	getProductByPage,
	setPage,
	filterOptions,
	setFilterOptions
}: any) => {
	const router = useRouter()
	const handleChange = (event: SelectChangeEvent) => {
		setSorting(event.target.value as string)
	}

	const handleFilter = () => {
		setPage(1)

		getProductByPage({
			page: 1,
			limit: rowPerPage,
			sort: sorting,
			search_key: searchKey,
			product_category: category,
			product_shop: brand
		})
		setFilterOptions({
			searchKey: searchKey,
			category: category,
			brand: brand,
			sort: sorting
		})
		// router.push({
		// 	pathname: '/user/product',
		// 	query: {
		// 		shopName: brand,
		// 		category: category
		// 	}
		// })
	}

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: { xs: 'center', sm: 'flex-start' },
				flexDirection: { xs: 'column', sm: 'row', md: 'column' },
				justifyContent: { xs: 'center', sm: 'space-between' },
				textAlign: { xs: 'center', md: 'start' },
				mb: { xs: '32px', sm: '62px' },
				mr: { md: '12px' }
			}}
		>
			<Box>
				<Title title='Sorting' />
				<Select
					id='demo-simple-select'
					value={sorting}
					onChange={handleChange}
					sx={{
						padding: { xs: '12px', lg: '12px 24px' },
						margin: { xs: '12px 0' },
						'& .MuiSelect-select': {
							padding: 0
						}
					}}
				>
					<MenuItem value={'createdAt'}>Created At</MenuItem>
					<MenuItem value={'price'}>Price</MenuItem>
				</Select>
			</Box>
			<Box
				sx={{
					pt: { xs: '24px', sm: 0, md: '42px', lg: '90px' }
				}}
			>
				<Title title='Category' />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: { xs: 'center', md: 'flex-start' },
						justifyContent: 'center'
					}}
				>
					{listCategory.map(item => {
						return (
							<Typography
								key={item.id}
								variant='h5'
								sx={{
									textTransform: 'capitalize',
									fontSize: { xs: '18px', lg: '22px' },
									my: { xs: '8px', md: '12px', lg: '16px' },
									color: category === item.title ? '#fff' : '#000',
									backgroundColor:
										category === item.title ? '#A2C18A' : 'transparent',
									fontWeight: 300,
									lineHeight: ' 125.5%',
									padding: { xs: ' 4px 8px', md: ' 8px 12px' },
									position: 'relative',
									cursor: 'pointer',
									display: 'inline-block',
									'&::after': {
										content: '""',
										position: 'absolute',
										bottom: '-5px',
										left: '0',
										width: '0',
										height: '2px',
										backgroundColor: '#A2C18A',
										transition: 'all 0.3s ease'
									},
									'&:hover::after': {
										width: item.title !== category ? '100%' : '0'
									}
								}}
								onClick={() => setCategory(item.title)}
							>
								{item.title}
							</Typography>
						)
					})}
				</Box>
			</Box>
			<Box
				sx={{
					pt: { xs: '24px', sm: 0, md: '42px', lg: '90px' }
				}}
			>
				<Title title='Brand' />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: { xs: 'center', md: 'flex-start' },
						justifyContent: 'center'
					}}
				>
					{listBrands.map(item => {
						return (
							<Typography
								key={item.id}
								variant='h5'
								sx={{
									textTransform: 'capitalize',
									fontSize: { xs: '18px', md: '22px' },
									my: { xs: '8px', md: '12px', lg: '16px' },
									padding: { xs: '4px 8px' },
									color: brand === item.name ? '#fff' : '#000',
									backgroundColor:
										brand === item.name ? '#A2C18A' : 'transparent',
									fontWeight: 300,
									lineHeight: ' 125.5%',
									position: 'relative',
									cursor: 'pointer',
									display: 'inline-block',
									'&::after': {
										content: '""',
										position: 'absolute',
										bottom: '-5px',
										left: '0',
										width: '0',
										height: '2px',
										backgroundColor: '#A2C18A',
										transition: 'all 0.3s ease'
									},
									'&:hover::after': {
										width: item.name !== brand ? '100%' : '0'
									}
								}}
								onClick={() => setBrand(item.name)}
							>
								{item.name}
							</Typography>
						)
					})}
				</Box>
			</Box>
			<BaseButton
				onClick={handleFilter}
				variant='outlined'
				bgStyle='color'
				label='Filter'
				styleSx={{
					padding: '16px  34px ',
					color: '#171B1A',
					fontSize: { md: '18px' },
					fontWeight: 400,
					lineHeight: '125.5%',
					textTransform: 'capitalize',
					borderRadius: '4px',
					border: '1px solid #A2C18A',
					marginTop: { xs: '32px', md: '42px', lg: '90px' },
					transition: 'all 0.3s ease',
					'&:hover': {
						backgroundColor: '#A2C18A',
						color: '#fff',
						border: '1px solid #A2C18A'
					}
				}}
			/>
		</Box>
	)
}

export default SidebarProduct
