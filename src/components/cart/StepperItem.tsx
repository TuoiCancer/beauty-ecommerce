'use client';
import { roboto } from '@/assets/font';
import {
  Box,
  Button,
  Step,
  StepLabel,
  Typography,
  Stepper,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import ConfirmCheckout from './ConfirmCheckout';
import PaymentDetails from './PaymentDetails';
import ShippingAddressForm from './ShippingAddressForm';

const steps = [
  {
    title: 'Shipping Address',
    Component: ShippingAddressForm,
  },
  {
    title: 'Payment details ',
    Component: PaymentDetails,
  },
  {
    title: 'Review your order ',
    Component: ConfirmCheckout,
  },
];

const StepperItem = ({ handleClose }: any) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleClose();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      <Typography
        variant="h1"
        className={roboto.className}
        sx={{
          color: '#232323',
          fontSize: { xs: '24px', md: '32px' },
          fontWeight: { xs: 500, md: 700 },
          textAlign: 'center',
          mb: { xs: '24px', md: '32px' },
        }}
      >
        Check out
      </Typography>
      <Box>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((item, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={index} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      color: '#B3B3B3',
                      '&.Mui-active': {
                        color: '#0F8113',
                      },
                      '&.Mui-completed': {
                        color: '#0F8113',
                      },
                    },
                  }}
                >
                  {item.title}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep !== steps.length && (
          <Box
            sx={{
              pt: { xs: '24px' },
            }}
          >
            {/* Start render Body  */}
            {steps.map((item, index) => {
              if (index === activeStep) {
                return <item.Component key={index} />;
              }
            })}
            {/* End  */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                pt: { xs: '24px', md: '32px' },
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                onClick={handleNext}
                sx={{
                  borderRadius: '12px',
                  background:
                    'linear-gradient(146deg, #315316 0%, #72A748 100%)',
                  padding: { md: '8px 30px' },
                  textTransform: 'capitalize',
                  color: '#fff',
                }}
              >
                {activeStep === steps.length - 1 ? 'Buy' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StepperItem;
