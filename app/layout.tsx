import '@styles/globals.css'
import React, { ReactNode } from 'react';
import * as dotenv from 'dotenv';
import Navbar from '@components/Navbar';
import Provider from '@context/Provider';
import { getServerSession } from 'next-auth';

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
        name="facebook-domain-verification" content="icv5kpp51wffbot25tahg7epnrf0fq" 
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
        </body>
      </Provider>
  </html>
  )
}

export default RootLayout