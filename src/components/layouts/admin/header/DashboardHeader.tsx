import { Box, Typography } from '@mui/material'
import React from 'react'

import {
	DateRange,
	DateRangePicker,
	LocalizationProvider
} from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import BaseButton from '@/components/base/BaseButton'
import { Dayjs } from 'dayjs'

interface DashboardHeaderProps {
	value: DateRange<Dayjs>
	setValue: React.Dispatch<React.SetStateAction<DateRange<Dayjs>>>
}

const DashboardHeader = ({ value, setValue }: DashboardHeaderProps) => {
	const [rangeDate, setRangeDate] = React.useState<DateRange<Dayjs>>(value)

	const handleFilter = () => {
		setValue(rangeDate)
	}

	return (
		<Box
			sx={{
				mb: '52px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}
		>
			<Box>
				<Typography
					variant='h4'
					sx={{
						color: '#000',
						/* LargeTitle */
						fontFamily: 'Poppins',
						fontSize: '28px',
						fontStyle: 'normal',
						fontWeight: '500',
						lineHeight: '150%'
					}}
				>
					Welcome back,
				</Typography>
				<Typography
					variant='h6'
					sx={{
						color: 'var(--Secondary, #7C8DB5)',
						fontFamily: 'Poppins',
						fontSize: '16px',
						fontStyle: 'normal',
						fontWeight: '400',
						lineHeight: '150%'
					}}
				>
					Here is the information about all your orders
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateRangePicker
						localeText={{ start: 'From', end: 'To' }}
						sx={{
							'& .MuiFormControl-root': {
								background: '#fff'
							},
							'& .MuiInputBase-root': {
								color: '#1C2A53',
								fontFamily: 'Poppins',
								fontSize: '14px',
								width: '140px',
								'& fieldset': {
									border: 'none'
								},
								'&:hover fieldset': {
									border: 'none'
								}
							}
						}}
						value={value}
						onChange={(newValue: DateRange<Dayjs>) => {
							console.log(newValue)
							setRangeDate(newValue)
						}}
						calendars={1}
					/>
				</LocalizationProvider>
				<BaseButton
					label='Apply'
					variant='contained'
					onClick={handleFilter}
					styleSx={{
						background: '#1C2A53',
						color: '#fff',
						marginLeft: '16px',
						padding: '8px 24px',
						'&:hover': {
							background: '#1C2A53',
							color: '#fff'
						}
					}}
				/>
			</Box>
		</Box>
	)
}

export default DashboardHeader
