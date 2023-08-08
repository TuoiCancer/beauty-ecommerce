'use client';
import React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import Image from 'next/image';

export interface ReviewItemProps {
  img: string;
  rating: number;
  username: string;
  content: string;
  time: string;
}

const ReviewItem = ({
  img,
  rating,
  username,
  content,
  time,
}: ReviewItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        margin: { md: '62px 0' },
        height: { md: '280px' },
      }}
    >
      <Image src={img} alt="image" width={280} height={280} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#65795F',
          height: '100%',
          padding: { md: '62px 62px 62px  80px ' },
        }}
      >
        <Rating name="read-only" value={rating} readOnly />
        <Typography
          variant="h6"
          sx={{
            color: '#FFF',
            fontSize: '28px',
            fontWeight: 500,
            lineHeight: '125.5%',
            textTransform: 'capitalize',
            mt: { md: '12px' },
          }}
        >
          {username}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#FFF',
            fontSize: '18px',
            lineHeight: '154.5%',
            fontWeight: 300,
            margin: { md: '12px 0' },
          }}
        >
          {content}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#FFF',
            fontSize: '18px',
            fontWeight: 300,
            lineHeight: '154.5%',
          }}
        >
          {' '}
          - {time} -
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewItem;
