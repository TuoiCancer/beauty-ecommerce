'use client';
import { ibarra, roboto } from '@/assets/font';
import { listBrands, listCategory } from '@/constants';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  ButtonGroup,
} from '@mui/material';
import React from 'react';
import BaseButton from '../base/BaseButton';

const Title = ({ title }: { title: string }) => {
  return (
    <Typography
      variant="h3"
      className={ibarra.className}
      sx={{
        color: '#121212',
        fontSize: { md: '32px' },
        fontWeight: 700,
        lineHeight: '125.5%',
        paddingBottom: { md: '32px' },
      }}
    >
      {title}
    </Typography>
  );
};

const SidebarProduct = () => {
  const [sorting, setSorting] = React.useState('createdAt');
  const [brand, setBrand] = React.useState('All');
  const [category, setCategory] = React.useState('All');
  console.log('category', category);

  const handleChange = (event: SelectChangeEvent) => {
    setSorting(event.target.value as string);
  };
  return (
    <Box>
      <Box>
        <Title title="Sorting" />
        <Select
          id="demo-simple-select"
          value={sorting}
          onChange={handleChange}
          sx={{
            padding: { md: '12px 24px' },
            '& .MuiSelect-select': {
              padding: 0,
            },
          }}
        >
          <MenuItem value={'createdAt'}>Created At</MenuItem>
          <MenuItem value={'price'}>Price</MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          pt: '90px',
        }}
      >
        <Title title="Category" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {listCategory.map((item) => {
            return (
              <Typography
                key={item.id}
                variant="h5"
                sx={{
                  textTransform: 'capitalize',
                  fontSize: { md: '22px' },
                  mb: { md: '32px' },
                  color: category === item.title ? '#fff' : '#000',
                  backgroundColor:
                    category === item.title ? '#A2C18A' : 'transparent',
                  fontWeight: 300,
                  lineHeight: ' 125.5%',
                  padding: { md: '8px 12px' },
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
                    transition: 'all 0.3s ease',
                  },
                  '&:hover::after': {
                    width: item.title !== category ? '100%' : '0',
                  },
                }}
                onClick={() => setCategory(item.title)}
              >
                {item.title}
              </Typography>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          pt: '90px',
        }}
      >
        <Title title="Brand" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {listBrands.map((item) => {
            return (
              <Typography
                key={item.id}
                variant="h5"
                sx={{
                  textTransform: 'capitalize',
                  fontSize: { md: '22px' },
                  mb: { md: '32px' },
                  color: brand === item.name ? '#fff' : '#000',
                  backgroundColor:
                    brand === item.name ? '#A2C18A' : 'transparent',
                  padding: { md: '8px 12px' },
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
                    transition: 'all 0.3s ease',
                  },
                  '&:hover::after': {
                    width: item.name !== brand ? '100%' : '0',
                  },
                }}
                onClick={() => setBrand(item.name)}
              >
                {item.name}
              </Typography>
            );
          })}
        </Box>
      </Box>
      <BaseButton
        variant="outlined"
        bgStyle="color"
        label="Filter"
        styleSx={{
          padding: '16px  34px ',
          color: '#171B1A',
          fontSize: { md: '18px' },
          fontWeight: 400,
          lineHeight: '125.5%',
          textTransform: 'capitalize',
          borderRadius: '4px',
          border: '1px solid #A2C18A',
          marginTop: '90px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#A2C18A',
            color: '#fff',
            border: '1px solid #A2C18A',
          },
        }}
      />
    </Box>
  );
};

export default SidebarProduct;
