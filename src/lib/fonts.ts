import localFont from 'next/font/local';

export const fontSans = localFont({
  src: '../../public/fonts/GeistVF.woff',
  variable: '--font-sans',
  weight: '100 900'
});

export const fontMono = localFont({
  src: '../../public/fonts/GeistMonoVF.woff',
  variable: '--font-mono',
  weight: '100 900'
});
