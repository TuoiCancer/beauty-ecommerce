'use client'
import { listBrands, listCategory } from '@/constants'
import {
	Box,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import BaseButton from '../base/BaseButton'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { useStore } from '@/store'
import { ibarra } from '../../../public/font'
const Title = ({ title, dictionary }: { title: string; dictionary: any }) => {
	return (
		<Typography
			variant='h3'
			className={ibarra.className}
			sx={{
				color: '#121212',
				fontSize: { xs: '20px', lg: '28px' },
				fontWeight: 700,
				lineHeight: '125.5%',
				paddingBottom: { md: '18px', lg: '32px' }
			}}
		>
			{dictionary.Product[title]}
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
	setFilterOptions,
	orderBy,
	setOrderBy,
	dictionary
}: any) => {
	const router = useRouter()
	const { UserSlice } = useStore()
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
			order: orderBy,
			product_shop: brand,
			user_id: UserSlice.user?.id
		})
		setFilterOptions({
			searchKey: searchKey,
			category: category,
			brand: brand,
			sort: sorting,
			orderBy: orderBy
		})
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
				<Title title='Sorting' dictionary={dictionary} />
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<Select
						id='demo-simple-select'
						value={sorting}
						onChange={handleChange}
						sx={{
							padding: { xs: '12px', lg: '12px 0 12px 0' },
							'& .MuiSelect-select': {
								padding: 0
							},
							'& fieldset': {
								border: 'none'
							}
						}}
					>
						<MenuItem value={'createdAt'}>{dictionary.Product.create}</MenuItem>
						<MenuItem value={'price'}>{dictionary.Product.price}</MenuItem>
					</Select>
					<Box
						onClick={() => {
							if (orderBy === 'ASC') {
								setOrderBy('DESC')
							} else {
								setOrderBy('ASC')
							}
						}}
					>
						<ArrowCircleUpIcon
							sx={{
								fontSize: '30px',
								color: '#78bf40',
								cursor: 'pointer',
								transform: orderBy === 'ASC' ? 'rotate(0deg)' : 'rotate(180deg)'
							}}
						/>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					pt: { xs: '24px', sm: 0, md: '42px', lg: '90px' }
				}}
			>
				<Title title='Category' dictionary={dictionary} />
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
								{dictionary.Product[item.title]}
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
				<Title title='Brand' dictionary={dictionary} />
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
								{item.name === 'All' ? dictionary.Product.All : item.name}
							</Typography>
						)
					})}
				</Box>
			</Box>
			<BaseButton
				onClick={handleFilter}
				variant='outlined'
				bgStyle='color'
				label={dictionary.Product.filter}
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
