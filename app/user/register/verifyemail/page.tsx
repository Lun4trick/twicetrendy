"use client"

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error: any) {
      setError(true);
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
          ? <section className='flex flex-col gap-3'>
              <h1 className='text-xl text-center md:text-2xl font-bold'>
                Email visszaigazolva!
              </h1>
              <p className='text-sm md:text-base text-center'>
                Hamarosan visszairányítunk a főoldalra....
              </p>
            </section>
          : error
            ? <h1 className='text-2xl font-bold'>Valami hiba történt!</h1>
            : <h1 className='text-2xl font-bold'>Email visszaigazolása...</h1>
      }
    </div>
  )
}