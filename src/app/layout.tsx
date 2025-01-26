import AuthProvider from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { WebVitals } from '@/components/web-vitals';
import { env } from '@/env';
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
  title: {
    template: '%s | Note Taking App',
    default: 'Noted',
  },
  applicationName: 'Noted',
  publisher: 'Nathan Cuevas',
  description:
    'Noted is a note taking app that allows you to take notes and organize them in a clean and simple way.',
  keywords: ['note', 'notes', 'note taking', 'note app', 'noted'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute={'class'}
            defaultTheme={'system'}
            enableSystem
            disableTransitionOnChange
          >
            {env.NODE_ENV === 'development' ? <WebVitals /> : null}
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
