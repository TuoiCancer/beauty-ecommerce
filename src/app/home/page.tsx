'use client';

import { hindMadurai, homemadeApple, ibarra } from '@/assets/font';
import BaseButton from '@/components/base/BaseButton';
import ImageItem from '@/components/base/ImageItem';
import BrandItem from '@/components/home/BrandItem';
import ImageSliderItem, { Comment } from '@/components/home/ImageSliderItem';
import IntroItem from '@/components/home/IntroItem';
import TopProductItem from '@/components/home/TopProductItem';
import { listBrands, listComments, listProduct } from '@/constants';
import SwipeableViews from 'react-swipeable-views';
// import BaseNavbar from '@/components/base/BaseNavbar';
import { Box, MobileStepper, Typography, useThemeProps } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const menuItems = [
  { id: 1, label: 'Home', isHasDropdown: false },
  { id: 2, label: 'Product', isHasDropdown: false },
  { id: 3, label: 'Shop', isHasDropdown: true },
];

const menuDropdownItems = [
  { id: 1, label: 'L’Oréal' },
  { id: 2, label: 'The Ordinary' },
  { id: 3, label: 'Bioderma' },
];

const listIntroduce = [
  {
    id: '1',
    title: '05+',
    lable: 'Years of Experience',
    description:
      'We are 05 years of experienced in this yoga field. Giving the best instructions.',
  },
  {
    id: '2',
    title: '15+',
    lable: 'Experienced Trainer',
    description:
      'We are 05 years of experienced in this yoga field. Giving the best instructions.',
  },
  {
    id: '3',
    title: '5K+',
    lable: 'Happy Clients',
    description:
      'We are 05 years of experienced in this yoga field. Giving the best instructions.',
  },
  {
    id: '4',
    title: '24+',
    lable: 'Monthly Routine',
    description:
      'We are 05 years of experienced in this yoga field. Giving the best instructions.',
  },
];

export default function Home() {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        pb: { md: '320px' },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: { md: '100%' },
          height: { md: '100vh' },
          background: 'linear-gradient(176deg, #FFF 0%, #F1F1F1 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-60%',
            right: '-26%',
            width: { md: '1400px' },
            height: { md: '1359px' },
            borderRadius: '50%',
            border: ' 1px solid rgba(110, 157, 72, 0.80)',
            background: '#A0BE88 ',
          }}
        >
          <ImageItem
            imgSrc="/img/leaf.png"
            style={{
              position: 'absolute',
              top: '82%',
              left: '10%',
              transform: 'translate(-50%, -50%)',
              width: { md: '400px' },
              height: { md: '386px' },
            }}
          />
          <ImageItem
            imgSrc="/img/leaf.png"
            style={{
              position: 'absolute',
              top: '60%',
              left: '37%',
              transform: 'rotate(45deg)',
              width: { md: '216px' },
              height: { md: '206px' },
            }}
          />

          <ImageItem
            imgSrc="/img/shadow.png"
            style={{
              position: 'absolute',
              bottom: '-10%',
              right: ' 30%',
              width: { md: '920px' },
              height: { md: '110px' },
            }}
          />
        </Box>

        <Box
          sx={{
            height: { md: '100%' },
            margin: { md: '330px 0 0 144px' },
            maxWidth: { md: '620px' },
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '16%',
              right: '-20px',
              width: { md: '100px' },
              height: { md: '100px' },
              borderRadius: '50%',
              background:
                'linear-gradient(180deg, rgba(82, 115, 61, 0.80) 25%, rgba(200, 210, 172, 0.00) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          />
          <Typography
            className={ibarra.className}
            variant="h1"
            sx={{
              color: '#121212',
              fontSize: '64px',
              fontWeight: 700,
              lineHeight: '121.5%' /* 77.76px */,
            }}
          >
            Beauty Has A Purpose and Purpose Is You
          </Typography>
          <Typography
            className={hindMadurai.className}
            variant="h2"
            sx={{
              color: '#3E3E3E',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '180%',
              padding: { md: '45px 0' },
            }}
          >
            Products made out of 100% natural ingredients with no side effects
            unlike their competitors. Lorem Ipsum as their default model text,
            and many web sites.
          </Typography>
          <Box>
            <BaseButton
              bgStyle="gradient"
              label="Shop Now"
              variant="contained"
              type="button"
              styleSx={{
                padding: { md: '16px 40px' },
                borderRadius: { md: '50px' },
                color: '#fff',
                background: 'linear-gradient(146deg, #315316 0%, #72A748 100%)',
                fontStyle: 'capitalize',
                mr: { md: '20px' },
              }}
            />

            <BaseButton
              bgStyle="gradient"
              label="Learn more"
              variant="outlined"
              type="button"
              styleSx={{
                padding: { md: '16px 40px' },
                borderRadius: { md: '50px' },
                color: '#000',
                border: '1px solid #72A748',
                '&:hover': {
                  border: '1px solid #315316',
                  background: 'transparent',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* Introduce */}
      <Box
        sx={{
          maxWidth: { md: '1600px' },
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: { md: '136px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexWrap: 'wrap',
          }}
        >
          {listIntroduce.map((item) => {
            return (
              <IntroItem
                key={item.id}
                title={item.title}
                label={item.lable}
                description={item.description}
              />
            );
          })}
        </Box>
        <Box
          sx={{
            flex: 1,
            pl: { md: '160px' },
          }}
        >
          <Typography
            className={ibarra.className}
            variant="h1"
            sx={{
              color: '#121212',
              fontSize: '48px',
              fontWeight: 700,
              lineHeight: '125.5%',
            }}
          >
            We make your daily routine more sustainable with products
          </Typography>
          <Typography
            variant="h2"
            className={hindMadurai.className}
            sx={{
              color: '#3E3E3E',
              fontSize: '18px',
              lineHeight: '180%',
              padding: { md: '48px 0' },
            }}
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt
          </Typography>
          <Typography
            variant="h3"
            className={homemadeApple.className}
            sx={{
              color: '#315316',
              fontSize: { md: '36px' },
            }}
          >
            glow $ grace
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#121212',
              fontSize: '20px',
              lineHeight: '150%',
              margin: { md: '20px 0 0px 0' },
            }}
            className={hindMadurai.className}
          >
            Xuan Tuoi{' '}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#121212',
              fontSize: '14px',
              lineHeight: '180%',
            }}
            className={hindMadurai.className}
          >
            Founder
          </Typography>
        </Box>
      </Box>
      {/* Brands  */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: { md: '100%' },
            height: { md: '312px' },
            background: 'linear-gradient(176deg, #FFF 0%, #F1F1F1 100%)',
            position: 'absolute',
            bottom: { md: '0%' },
            left: 0,
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            maxWidth: { md: '1600px' },
            margin: '0 auto',
            py: { md: '136px' },
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h1"
            className={ibarra.className}
            sx={{
              color: '#121212',
              fontSize: '48px',
              fontWeight: 700,
              lineHeight: '125.5%',
            }}
          >
            Our local brands
          </Typography>
          <Typography
            variant="h2"
            className={hindMadurai.className}
            sx={{
              color: '#3E3E3E',
              fontSize: '18px',
              lineHeight: '180%',
              maxWidth: { md: '846px' },
              textAlign: 'center',
              margin: { md: '12px 0' },
            }}
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore.{' '}
          </Typography>
          <Box
            sx={{
              width: { md: '100%' },
              pt: { md: '78px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {listBrands.map((item) => {
              if (item.name !== 'All') {
                return (
                  <BrandItem
                    key={item.id}
                    brandName={item.name}
                    imgSrc={item.imgSrc}
                    link={item.link}
                  />
                );
              } else {
                return null;
              }
            })}
          </Box>
        </Box>
      </Box>
      {/* Top Products */}
      <Box
        sx={{
          maxWidth: { md: '1600px' },
          margin: '0 auto',
          pt: { md: '200px' },
        }}
      >
        <Typography
          variant="h1"
          className={ibarra.className}
          sx={{
            textAlign: 'center',
            color: '#121212',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: '125.5%',
            pb: { md: '160px' },
          }}
        >
          Beauty Cosmetics Products
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'justify-between',
            alignItems: 'center',
            '& a': {
              textDecoration: 'none',
            },
          }}
        >
          {listProduct.slice(0, 4).map((item) => {
            return <TopProductItem key={item.id} item={item} />;
          })}
        </Box>
      </Box>
      {/* Review */}
      <Box
        sx={{
          pt: { md: '220px' },
          maxWidth: { md: '1600px' },
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          justifyContent: 'center',
        }}
      >
        <ImageItem
          imgSrc="/img/leaf.png"
          style={{
            position: 'absolute',
            top: '30%',
            left: '9%',
            width: { md: '230px' },
            height: { md: '230px' },
            transform: 'rotate(250deg)',
            zIndex: 2,
          }}
        />

        <ImageItem
          imgSrc="/img/leaf.png"
          style={{
            position: 'absolute',
            top: '50%',
            right: '9%',
            width: { md: '230px' },
            height: { md: '230px' },
            transform: 'rotate(250deg)',
            zIndex: 2,
          }}
        />

        <Typography
          variant="h2"
          className={ibarra.className}
          sx={{
            color: '#121212',
            textAlign: 'center',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: '125.5%',
            pb: { md: '124px' },
          }}
        >
          What People Say About Us
        </Typography>

        <AutoPlaySwipeableViews
          className="w-full"
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {listComments.map((item: Comment, index: number) => {
            return (
              <div key={item.id}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <ImageSliderItem comment={item} />
                ) : null}
              </div>
            );
          })}
        </AutoPlaySwipeableViews>
        <MobileStepper
          variant="dots"
          steps={listComments.length}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1 }}
          backButton={false}
          nextButton={false}
        />
      </Box>
    </Box>
  );
}
