'use client';
import React from 'react';

import { Box, TextField, Button } from '@mui/material';
import Image from 'next/image';
import { useCreateProduct } from '@/service/react-query/product.query';

const CreateProductTest = () => {
  const [name, setName] = React.useState('');
  const [imgSrc, setImgSrc] = React.useState('');
  const { isLoading, mutate: createProduct } = useCreateProduct();

  const showPreview = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgSrc(reader.result as string);
      };
    }
  };

  return (
    <Box
      sx={{
        pt: '200px',
        pb: '100px',
      }}
    >
      <TextField
        placeholder="product name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        placeholder="product name"
        type="file"
        onChange={(e) => {
          showPreview(e);
        }}
      />
      <Image
        alt="image"
        width={200}
        height={200}
        src={
          imgSrc
            ? imgSrc
            : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
        }
      />
      <Button
        variant="contained"
        onClick={() => {
          createProduct({ name, imgSrc });
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateProductTest;
