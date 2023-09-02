import { listCard } from '@/constants';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import React from 'react';

const PaymentDetails = () => {
  return (
    <Box
      sx={{
        pt: { lg: '42px' },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#000',
          fontSize: { xs: '16px', md: '18px', lg: '22px' },
          fontWeight: 500,
          mb: { xs: '20px', lg: '24px' },
        }}
      >
        Payment method
      </Typography>
      <Box>
        <RadioGroup
          defaultValue="card"
          name="radio-buttons-group"
          sx={{
            '& .MuiFormControlLabel-root': {
              '& .MuiRadio-root': {
                color: '#0F8113',
              },
            },
          }}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            sx={{
              mb: { md: '32px' },
              '& .MuiTypography-root': {
                width: '100%',
              },
            }}
            label={
              <Box
                sx={{
                  pl: { md: '16px' },
                  flex: 1,
                  width: '100%',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    mb: { xs: '12px', md: 0 },
                  }}
                >
                  Credit card
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '& input': {
                      borderRadius: '10px',
                      border: '1px solid #EBEBEB',
                      background: '#F8F8F9',
                      fontSize: '16px',
                      fontWeight: 300,
                      fontFamily: 'Roboto',
                      flex: 1,
                    },
                    '& .MuiInputBase-root': {
                      mt: { md: '16px' },
                      '& fieldset': {
                        border: '1px solid #EBEBEB !important',
                      },
                      '&.Mui-focused': {
                        // border: '1px solid #EBEBEB ',
                      },
                      '&:hover': {
                        '& fieldset': {
                          border: 'none',
                        },
                      },
                    },
                  }}
                >
                  <Select
                    id="demo-simple-select-label"
                    sx={{
                      mr: { xs: '24px', md: '56px' },
                      flex: 1,
                    }}
                    placeholder="Card type *"
                  >
                    {listCard.map((item, index) => {
                      return (
                        <MenuItem key={item.id} value={item.value}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>

                  <TextField
                    sx={{
                      flex: 1,
                    }}
                    placeholder="Card number *"
                  />
                </Box>
              </Box>
            }
          />

          <FormControlLabel
            value="money"
            control={<Radio />}
            label={
              <Typography
                variant="body1"
                sx={{
                  pl: { md: '16px' },
                }}
              >
                Payment when receive product
              </Typography>
            }
          />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default PaymentDetails;
