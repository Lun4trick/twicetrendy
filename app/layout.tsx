/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import '@styles/globals.css'
import React, { ReactNode } from 'react';
import * as dotenv from 'dotenv';
import Navbar from '@components/Navbar';
import Provider from '@context/Provider';
import { getServerSession } from 'next-auth';
import Script from 'next/script';

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
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${process.env.FACEBOOK_PIXEL_ID});
          `,
        }}
      />
      <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
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
        </body>
      </Provider>
  </html>
  )
}

export default RootLayout