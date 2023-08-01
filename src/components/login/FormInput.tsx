import React from 'react';
import { Poppins } from 'next/font/google';
import { Box, TextField, Typography } from '@mui/material';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const FormInput = ({
  label, //
  type, // text, password, email
  typeOfVariant, //
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  typeOfVariant: any;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  return (
    <Box>
      <Typography
        variant="h6"
        className={poppins.className}
        sx={{
          color: '#A77A63',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 500,
          mb: '10px',
        }}
      >
        {label} *
      </Typography>
      <TextField
        type={type}
        variant={typeOfVariant}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        sx={{
          width: { md: '640px' },
          height: { md: '46px' },
          borderRadius: { md: '10px' },
          mb: '24px',
          background: '#F8F8F9',
          '& .MuiOutlinedInput-root': {
            input: {
              padding: '12px',
            },
            fieldset: {
              border: 'none',
            },
          },
        }}
      />
    </Box>
  );
};

export default FormInput;
