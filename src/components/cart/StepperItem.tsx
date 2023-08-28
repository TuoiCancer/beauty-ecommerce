'use client';
import { roboto } from '@/assets/font';
import {
  Box,
  Button,
  Step,
  StepLabel,
  Typography,
  Stepper,
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

const StepperItem = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  console.log('activeStep ----------> ', activeStep);

  return (
    <Box>
      <Typography
        variant="h1"
        className={roboto.className}
        sx={{
          color: '#232323',
          fontSize: '32px',
          fontWeight: 400,
          textAlign: 'center',
          mb: { md: '32px' },
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
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
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
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <Box>
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
                pt: { md: '32px' },
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
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StepperItem;
