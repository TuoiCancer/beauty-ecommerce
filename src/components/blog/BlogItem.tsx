import React from 'react';
import ImageItem from '../base/ImageItem';
import { Box, Typography } from '@mui/material';
import BaseButton from '../base/BaseButton';

export interface BlogItemProps {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
}

const BlogItem = ({ blog }: { blog: BlogItemProps }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: { md: '60px' },
        boxShadow: '0px 4px 32px 0px rgba(212, 212, 212, 0.25)',
      }}
    >
      <ImageItem
        imgSrc={blog.image}
        style={{
          width: { md: '380px' },
          height: { md: '340px' },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flex: 1,
          padding: { md: '48px 40px' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: '#112304',
            fontSize: '26px',
            lineHeight: '125.5%',
            fontWeight: 400,
          }}
        >
          {blog.title}
        </Typography>
        <Box
          sx={{
            margin: { md: '18px 0' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <ImageItem
            imgSrc="/img/Calendar.png"
            style={{
              width: { md: '24px' },
              height: { md: '24px' },
              mr: { md: '8px' },
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: '#A6A6A6',
              fontSize: '18px',
              fontWeight: 300,
              lineHeight: '125.5%',
            }}
          >
            {blog.date}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: '#414141',
            fontSize: '18px',
            fontWeight: 300,
            lineHeight: '146%',
            display: ' -webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
          }}
        >
          {blog.content}
        </Typography>
        <BaseButton
          label="read more"
          variant="text"
          styleSx={{
            color: '#2C5F23',
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '125.5%',
            textTransform: 'capitalize',
            mt: { md: 'auto' },
          }}
        />
      </Box>
    </Box>
  );
};

export default BlogItem;
