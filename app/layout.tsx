/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import '@styles/globals.css'
import React, { ReactNode, Suspense } from 'react';
import * as dotenv from 'dotenv';
import Navbar from '@components/Navbar';
import Provider from '@context/Provider';
import { getServerSession } from 'next-auth';
import { FacebookPixelEvents } from '@components/facebookPixel';

export const metadata = {
  title: 'Twice Trendy',
  desciption: 'sells branded second hand clothes'
}

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  dotenv.config();
  const session = await getServerSession();

  return (
    <html lang='hu'>
      <head>
      <meta 
        name="facebook-domain-verification" content={process.env.FACEBOOK_AUTH}
      />
      </head>

      <Provider session={session}>
        <body>
          <div className='main'>
            <div className='gradient'/>
          </div>

          <main className='app font-poppins'>
              <Navbar/>
              {children}
          </main>
          <Suspense fallback={null}>
            <FacebookPixelEvents />
          </Suspense>
        </body>
      </Provider>
  </html>
  )
}

export default RootLayout