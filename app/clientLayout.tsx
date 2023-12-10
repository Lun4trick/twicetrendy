'use client'
import Navbar from '@components/Navbar';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <html lang='hu'>
      <body>
        <div className='main'>
          <div className='gradient'/>
        </div>

        <main className='app font-poppins'>
          <SessionProvider>
            <Navbar/>
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  )
}

export default ClientLayout