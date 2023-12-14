'use client'
import { SessionProvider } from 'next-auth/react'
import router from 'next/router'

type ProviderProps = {
  children: React.ReactNode
  session: any
}

import React, { useEffect } from 'react'

function Provider({ children, session }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
