'use client'

import RegFailed from '@components/RegFailed';
import RegSuccess from '@components/RegSuccess';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RegistrationComplete = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

  const checkToken = async() => {
    try {
      const res = await axios.post('/api/users/registrationSuccess', { token });
      console.log(res)
      if (res.status === 201) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }

    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const urlToken = window.location.href.split('=')[1];
    setToken(urlToken);
    checkToken();
  }, []);

  useEffect(() => {
    if(token) {
      checkToken()
    };
  }, [token]);

  useEffect(() => {
    console.log(session?.user, status)
  }, [session])

      return (
        <div>
          {
            isLoading
              ? <h1 className=' w-full h-20 text-8xl animate-bounce mt-5'>...</h1>
              : <div>
                  {
                  isTokenValid
                    ? <RegSuccess />
                    : <RegFailed />
                  }
                </div>}
          </div>
      )
    }

export default RegistrationComplete;