import { Box, Typography } from '@mui/material';
import Image from 'next/legacy/image';
import React from 'react';

const InfoTag = () => {
  return (
    <Box
      sx={{
        width: { xs: '80%', md: '842px' },
        height: { md: '200px', lg: '242px' },
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          height: { md: '100%' },
          width: { md: '196px' },
        }}
      >
        <Image
          src="/img/speaker.png"
          alt="bg"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box
        sx={{
          padding: { md: '24px 32px', lg: '69px 74px 45px 62px' },
          flex: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#6D6D6D',
            fontSize: '18px',
            mb: '28px',
            lineHeight: '145%',
          }}
        >
          “Our four Divisions play a major strategic role as they enable L’Oréal
          to cover all the aspects of beauty.”
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            sx={{
              width: '16px',
              height: '1px',
              backgroundColor: '#C0335D',
              mr: '12px',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: '#C0335D',
              fontSize: '18px',
              textTransform: 'uppercase',
            }}
          >
            Nicolas Hieronimus
          </Typography>
        </Box>
        <Typography
          variant="h5"
          sx={{
            color: '#A0A0A0',
            fontSize: '14px',
            lineHeight: '145%',
            mt: '10px',
          }}
        >
          Chief Executive Officer
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoTag;
