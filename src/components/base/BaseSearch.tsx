import SearchIcon from '@mui/icons-material/Search'
import { Box, TextField } from '@mui/material'

const BaseSearch = () => {
	return (
		<TextField
			variant='standard'
			margin='normal'
			required
			name='search'
			fullWidth
			autoComplete='search'
			autoFocus
			placeholder='Search...'
			InputProps={{
				startAdornment: (
					<SearchIcon sx={{ color: '#9FA2AB', mr: 1, my: 0.5 }} />
				),
				disableUnderline: true
			}}
			sx={{
				backgroundColor: '#F8F9FA',
				padding: '0.25rem 1rem',
				borderRadius: '20px',
				margin: 0
			}}
		/>
	)
}

export default BaseSearch
