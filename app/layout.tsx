import '@styles/globals.css'
import React, { ReactNode } from 'react';
import * as dotenv from 'dotenv';
import ClientLayout from './clientLayout';

export const metadata = {
  title: 'Twice Trendy',
  desciption: 'sells branded second hand clothes'
}

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  dotenv.config();
  return <ClientLayout>{children}</ClientLayout>
}

export default RootLayout