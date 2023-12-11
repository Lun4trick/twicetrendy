'use client'
import LoginForm from '@components/LoginForm'
import RegistrationForm from '@components/RegistrationForm'
import { useEffect, useState } from 'react'
import { AuthFormType } from '@utils/authForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Auth = () => {
  const {
    LOGIN,
    REGISTRATION
  } = AuthFormType;

  const {data: session, status} = useSession();
  const router = useRouter();

  const [currentForm, setCurrentForm] = useState<AuthFormType>(LOGIN)
  const onRegister = () => {
    setCurrentForm(REGISTRATION)
  }
  const onLogin = () => {
    setCurrentForm(LOGIN)
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
    console.log(session?.user, status)
  }, [])


    return (
      <>
      {status !== 'unauthenticated' ? (
        <div>
          <h1 className=' w-full h-20 text-8xl animate-bounce mt-5'>...</h1>
        </div>
      ) : (
        <section className='flex w-full justify-evenly'>
          {
            currentForm == LOGIN
              ? <LoginForm onFormChange={onRegister}/>
              : <RegistrationForm onFormChange={onLogin}/>
          }
        </section>
      )}
      </>
    )
}

export default Auth