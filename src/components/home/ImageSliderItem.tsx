import React from 'react';

import { Box, Typography } from '@mui/material';
import { inter, roboto } from '@/assets/font';
import ImageItem from '../base/ImageItem';

export interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
}

const ImageSliderItem = ({ comment }: { comment: Comment }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: { md: '940px' },
        padding: { md: '120px 178px 40px 178px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        border: '1px solid #EEE',
        boxShadow: '0px 18px 36px 0px rgba(0, 0, 0, 0.07)',
        margin: '0 auto',
      }}
    >
      <ImageItem
        imgSrc={comment.user.avatar}
        style={{
          position: 'absolute',
          top: '0',
          left: '44%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: '1px solid #6DC229',
          '& img': {
            objectFit: 'cover !important',
            borderRadius: '50%',
          },
        }}
      />
      <Typography
        variant="body1"
        className={roboto.className}
        sx={{
          color: '#6D6D6D',
          fontSize: '18px',
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: '32px',
          mb: { md: '28px' },
          maxWidth: { md: '600px' },
          textAlign: 'center',
        }}
      >
        {comment.content}
      </Typography>
      <Typography
        variant="body1"
        className={roboto.className}
        sx={{
          color: '#252525',
          fontSize: '20px',
          lineHeight: '150%',
          textTransform: 'capitalize',
          textAlign: 'center',
        }}
      >
        - {comment.user.username} -
      </Typography>
    </Box>
  );
};

export default ImageSliderItem;
