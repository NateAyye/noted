import { ThemeProvider } from '@/components/theme-provider';
import { WebVitals } from '@/components/web-vitals';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Noted - Note Taking App',
  description:
    'Noted is a note taking app that allows you to take notes and organize them in a clean and simple way.',
  keywords: ['note', 'notes', 'note taking', 'note app', 'noted'],
  publisher: 'Nathan Cuevas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute={'class'}
          defaultTheme={'system'}
          enableSystem
          disableTransitionOnChange
        >
          {process.env.NODE_ENV === 'development' ? <WebVitals /> : null}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
