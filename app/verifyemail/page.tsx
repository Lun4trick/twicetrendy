"use client"

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
  const  [token, setToken] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyUserEmail = async () => {
    try {
      axios.post('api/users/verifyemail', { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.href.split('=')[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if(token) {
      verifyUserEmail()
    };
  }, [token]);

  return(
    <div className='flex flex-col justify-center items-center mt-10'>
      {
        verified
          ? <h1 className='text-2xl font-bold'>Email visszaigazolva!</h1>
          : error
            ? <h1 className='text-2xl font-bold'>Valami hiba történt!</h1>
            : <h1 className='text-2xl font-bold'>Email visszaigazolása...</h1>
      }
      <Link href='/'>
        <p className='text-xl font-bold mt-4 border-2 rounded-lg p-2 bg-slate-500 bg-opacity-25 hover:bg-opacity-70 transition-all'>Kezdődhet a vásárlás!</p>
      </Link>
    </div>
  )
}