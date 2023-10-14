'use client'

import BlogItem from '@/components/blog/BlogItem'
import PaginationItem from '@/components/product/Pagination'
import { listNews } from '@/constants'
import { Box, Typography } from '@mui/material'
import React from 'react'

const BlogPage = () => {
	const [limit, setLimit] = React.useState(12)
	return (
		<Box
			sx={{
				maxWidth: {
					xs: 'var(--max-width-xs)',
					sm: 'var(--max-width-sm)',
					md: 'var(--max-width-md)',
					lg: 'var(--max-width-lg)',
					xl: 'var(--max-width-xl)'
				},
				margin: '0 auto',
				padding: { xs: '120px 12px', md: '160px 0 ' }
			}}
		>
			<Typography
				variant='h1'
				sx={{
					color: '#000',
					fontSize: '48px',
					fontWeight: 500,
					lineHeight: '125.5%',
					textAlign: 'center'
				}}
			>
				Blogs
			</Typography>
			<Box
				sx={{
					padding: { xs: '48px 0', md: '68px 24px 0' }
				}}
			>
				{listNews.map((item, index) => {
					return <BlogItem key={index} blog={item} />
				})}
				<PaginationItem
					rowPerPage={limit}
					setRowPerPage={setLimit}
					dictionary={dictionary}
				/>
			</Box>
		</Box>
	)
}

export default BlogPage
