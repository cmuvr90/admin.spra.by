import './globals.css';
import '../styles/index.scss';
import React, {ReactNode} from 'react';
import {Inter} from 'next/font/google';
import {AppProvider} from "@/providers/AppProvider";

const inter = Inter({
  subsets: ['latin'],
});


export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <AppProvider>
      {children}
    </AppProvider>
    </body>
    </html>
  );
}
