'use client';

import { hindMadurai, ibarra, poppins, roboto } from '@/assets/font';
import BaseButton from '@/components/base/BaseButton';
import ImageItem from '@/components/base/ImageItem';
import ReviewItem from '@/components/product/ReviewItem';
import { listComments, listProduct } from '@/constants';
import { Box, ButtonBase, TextField, Typography } from '@mui/material';
import React from 'react';

const ProductDetail = () => {
  const [activeImg, setActiveImg] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [isActiveReviews, setIsActiveReviews] = React.useState(false);
  const product = listProduct[0];
  return (
    <Box
      sx={{
        pt: { md: '240px' },
        pb: '200px',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { md: '318px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Image */}
        <ImageItem
          imgSrc="/img/banner.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '-1',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.39)',
            },
          }}
        />

        <Typography
          className={ibarra.className}
          variant="h1"
          sx={{
            color: '#FFF',
            fontSize: { md: '52px' },
            fontWeight: 700,
            lineHeight: '125.5%',
            textAlign: 'center',
          }}
        >
          The Ordinary
        </Typography>

        <Typography
          className={ibarra.className}
          variant="h1"
          sx={{
            color: '#FFF',
            fontSize: { md: ' 28px' },
            pt: { md: '16px' },
            fontWeight: 400,
            lineHeight: '125.5%',
            textAlign: 'center',
          }}
        >
          The Ordinary is a cosmetics brand from Canada with affordable prices
          but quality that is comparable to other high-end brands.
        </Typography>
      </Box>
      {/* Info Product Detail  */}
      <Box
        sx={{
          maxWidth: { md: '1600px' },
          margin: '0 auto',
          pt: { md: '146px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              mr: { md: '44px' },
            }}
          >
            {product.image.map((item, index) => (
              <ImageItem
                key={index}
                imgSrc={item}
                style={{
                  width: { md: '168px' },
                  height: { md: '188px' },
                  mb: { md: '64px' },
                  border: index === activeImg ? '3px solid #6BB82F' : 'none',
                }}
                onClick={() => setActiveImg(index)}
              />
            ))}
          </Box>
          <ImageItem
            imgSrc={product.image[activeImg]}
            style={{
              width: { md: '565px' },
              height: { md: '692px' },
              position: 'relative',
              '&::before': {
                content: '"On - sale"',
                fontSize: '20px',
                textAlign: 'center',
                lineHeight: '60px',
                zIndex: '1',
                position: 'absolute',
                top: '16px',
                left: '-46px',
                width: '200px',
                height: '60px',
                backgroundColor: '#6BB82F',
                borderRadius: '8px',
                color: '#FFF',
                transform: 'rotate(-45deg)',
              },
            }}
          />
          <Box
            sx={{
              ml: { md: '108px' },
              maxWidth: { md: '700px' },
            }}
          >
            <Typography
              className={roboto.className}
              variant="h3"
              style={{
                color: '#000',
                fontSize: '38px',
                fontWeight: 500,
                lineHeight: '125.5%',
                // textOverflow: 'ellipsis',
                // overflow: 'hidden',
                // whiteSpace: 'nowrap',
                // width: '100%',
                // webkitLineClamp: 2,
                // webkitBoxOrient: 'vertical',
              }}
            >
              Acne treatment serum: The ordinary niacinamide 10 + zinc 1
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: { md: '16px' },
              }}
            >
              <Typography
                className={poppins.className}
                variant="h3"
                sx={{
                  color: '#AFAFAF',
                  fontSize: '24px',
                  fontWeight: 400,
                  textDecoration: 'line-through',
                }}
              >
                ${product.originalPrice}
              </Typography>
              <Typography
                variant="h3"
                className={poppins.className}
                sx={{
                  color: '#6A6A6A',
                  fontSize: '20px',
                  fontWeight: 400,
                  margin: { md: '0 32px' },
                }}
              >
                {(product.price /
                  (product.originalPrice || product.price * 2)) *
                  100}
                %
              </Typography>
              <Typography
                className={poppins.className}
                variant="h3"
                sx={{
                  color: '#355F14',
                  fontSize: '30px',
                  fontWeight: 400,
                }}
              >
                ${product.price}
              </Typography>
            </Box>
            <Typography
              className={roboto.className}
              variant="h4"
              sx={{
                color: '#737373',
                fontSize: '22px',
                fontWeight: 300,
                lineHeight: '154.5%',
                padding: { md: '46px 0 24px 0' },
              }}
            >
              {product.description}
            </Typography>
            <Box>
              {product.moreInfo.map((item, index) => (
                <Typography
                  key={index}
                  className={roboto.className}
                  variant="h4"
                  sx={{
                    color: '#737373',
                    fontSize: '22px',
                    fontWeight: 300,
                    lineHeight: '154.5%',
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
            {/* Buttons */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pt: { md: '62px' },
              }}
            >
              <Box
                className={roboto.className}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: { md: '52px' },
                  '& p': {
                    color: '#737373',
                    fontSize: '32px',
                    fontWeight: 600,
                    lineHeight: '154.5%',
                    margin: { md: '0 28px' },
                    cursor: 'pointer',
                    userSelect: 'none',
                  },
                }}
              >
                <Typography
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  {' '}
                  -{' '}
                </Typography>
                <TextField
                  type="number"
                  variant="filled"
                  value={quantity}
                  onChange={(e) =>
                    +e.target.value && setQuantity(+e.target.value)
                  }
                  sx={{
                    width: { md: '132px' },
                    margin: { md: '0 16px' },
                    '& input': {
                      pt: { md: '12px' },
                      fontSize: '20px',
                      pl: { md: '24px' },
                    },
                    '& .MuiInputBase-root': {
                      '&::before': {
                        borderBottom: 'none',
                      },
                      '&::after': {
                        borderBottom: 'none',
                      },
                      '&:hover ': {
                        '&::before': {
                          borderBottom: 'none',
                        },
                      },
                    },
                  }}
                />
                <Typography onClick={() => setQuantity(quantity + 1)}>
                  +
                </Typography>
              </Box>
              <BaseButton
                variant="contained"
                bgStyle="color"
                label="Add to cart"
                className={hindMadurai.className}
                styleSx={{
                  padding: { md: '8px 30px' },
                  borderRadius: '0',
                  background:
                    'linear-gradient(146deg, #315316 0%, #72A748 100%)',
                  color: '#FFF',
                  fontSize: '22px',
                  lineHeight: '180%',
                  textTransform: 'none',
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            pt: { md: '120px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& h4': {
                fontSize: '32px',
                lineHeight: '125.5%',
                mr: { md: '32px' },
                userSelect: 'none',
                cursor: 'pointer',
              },
            }}
          >
            <Typography
              variant="h4"
              className={roboto.className}
              sx={{
                color: !isActiveReviews ? '#315316' : '#000',
                fontWeight: !isActiveReviews ? 500 : 300,
              }}
              onClick={() => setIsActiveReviews(false)}
            >
              Description
            </Typography>
            <Typography
              variant="h4"
              className={roboto.className}
              sx={{
                color: isActiveReviews ? '#315316' : '#000',
                fontWeight: isActiveReviews ? 500 : 300,
              }}
              onClick={() => setIsActiveReviews(true)}
            >
              Reviews
            </Typography>
          </Box>
          <Box
            sx={{
              mt: { md: '32px' },
            }}
          >
            {isActiveReviews
              ? listComments.map((item, index) => (
                  <ReviewItem
                    key={index}
                    img={item.user.avatar}
                    username={item.user.username}
                    rating={item.rating}
                    content={item.content}
                    time={item.time}
                  />
                ))
              : product.details.map((item, index) => (
                  <Typography
                    key={index}
                    className={roboto.className}
                    variant="h4"
                    sx={{
                      color: '#737373',
                      fontSize: '22px',
                      fontWeight: 300,
                      lineHeight: '203.5%',
                    }}
                  >
                    {item}
                  </Typography>
                ))}
          </Box>
        </Box>
      </Box>
      {/* Review Section */}
    </Box>
  );
};

export default ProductDetail;
