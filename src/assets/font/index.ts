import {
  Ibarra_Real_Nova,
  Hind_Madurai,
  Poppins,
  Roboto,
  Homemade_Apple,
  Inter,
  Unica_One,
} from 'next/font/google';

export const ibarra = Ibarra_Real_Nova({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const homemadeApple = Homemade_Apple({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const hindMadurai = Hind_Madurai({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const poppins = Poppins({
  display: 'swap',
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
export const unicaOne = Unica_One({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  style: ['normal'],
});
