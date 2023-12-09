import Navbar from '@components/Navbar';
import '@styles/globals.css'
import React, { ReactNode } from 'react';
import * as dotenv from 'dotenv';

export const metadata = {
  title: 'Twice Trendy',
  desciption: 'sells branded second hand clothes'
}

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  dotenv.config();
  return (
    <html lang='hu'>
      <body>
        <div className='main'>
          <div className='gradient'/>
        </div>

        <main className='app font-poppins'>
          <Navbar/>
          {children}
        </main>
      </body>

    </html>
  )
}

export default RootLayout