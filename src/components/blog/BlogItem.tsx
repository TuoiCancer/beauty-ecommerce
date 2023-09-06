import React from 'react'
import ImageItem from '../base/ImageItem'
import { Box, Typography } from '@mui/material'
import BaseButton from '../base/BaseButton'
import Link from 'next/link'

export interface BlogItemProps {
	id: number
	title: string
	content: string
	image: string
	date: string
}

const BlogItem = ({ blog }: { blog: BlogItemProps }) => {
	return (
		<Link
			href={`/blog/${blog.id}`}
			style={{
				textDecoration: 'none'
			}}
		>
			<Box
				sx={{
					display: { xs: 'column', md: 'flex' },
					alignItems: 'center',
					justifyContent: 'space-between',
					mb: { xs: '32px', lg: '48px' },
					padding: { xs: '21px 12px', md: '24px' },
					boxShadow: '0px 4px 32px 0px rgba(212, 212, 212, 0.25)'
				}}
			>
				<ImageItem
					imgSrc={blog.image}
					style={{
						width: { xs: '100%', md: '300px' },
						height: { xs: '240px', md: '280px', lg: '200px' }
					}}
				/>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						marginLeft: { xs: 0, md: '40px' },
						flex: 1
					}}
				>
					<Typography
						variant='h2'
						sx={{
							color: '#112304',
							fontSize: { xs: '20px', md: '24px' },
							lineHeight: '125.5%',
							fontWeight: 400,
							display: ' -webkit-box',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: 2,
							overflow: 'hidden',
							padding: { xs: '12px 0' }
						}}
					>
						{blog.title}
					</Typography>
					<Box
						sx={{
							margin: { md: '12px 0' },
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start'
						}}
					>
						<ImageItem
							imgSrc='/img/Calendar.png'
							style={{
								width: { xs: '20px', md: '24px' },
								height: { xs: '20px', md: '24px' },
								mr: '8px'
							}}
						/>
						<Typography
							variant='body1'
							sx={{
								color: '#A6A6A6',
								fontSize: { xs: '16px' },
								fontWeight: 300,
								lineHeight: '125.5%'
							}}
						>
							{blog.date}
						</Typography>
					</Box>
					<Typography
						variant='body1'
						sx={{
							color: '#414141',
							fontSize: { xs: '16px' },
							fontWeight: 300,
							lineHeight: '146%',
							display: ' -webkit-box',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: 3,
							overflow: 'hidden',
							margin: { xs: '12px 0' }
						}}
					>
						{blog.content}
					</Typography>
					<BaseButton
						label='read more'
						variant='text'
						styleSx={{
							color: '#2C5F23',
							fontSize: { xs: '16px', md: '18px' },
							fontWeight: 500,
							lineHeight: '125.5%',
							textTransform: 'capitalize',
							mt: { md: 'auto' }
						}}
					/>
				</Box>
			</Box>
		</Link>
	)
}

export default BlogItem
