import type { Metadata } from 'next';
import './globals.css';

import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';
import { fontMono, fontSans } from '@/lib/fonts';
import { siteConfig } from '@/config/site';

import { ThemeProvider } from '@/components/providers/theme-provider';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: siteConfig.name
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['Next.js', 'SVG'],
  authors: [
    {
      name: 'Tyler Georges',
      url: 'https://tylergeorges.com'
    }
  ],
  creator: 'Tyler Georges'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'relative flex size-full h-full flex-1 bg-background font-sans text-foreground antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Toaster richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
