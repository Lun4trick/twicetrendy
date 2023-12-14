'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useLoginError } from '@customhooks/useLoginError'
import cn from 'classnames'
import { useRouter } from 'next/navigation'

interface Props {
  onFormChange: () => void
}
const LoginForm: React.FC<Props> = ( {onFormChange} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useLoginError();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false
    })

    if (res?.error) {
      const error = JSON.parse(res.error)
      setLoginError(error);
    }

    if (res?.ok) {
      console.log(res)
      router.push('/')
    }
  }

  return (
    <section>
      <form 
        action="#"
        method='POST' 
        className='flex flex-col gap-3 border-b-2 p-5'
        onSubmit={handleSubmit}
        autoComplete='on'
      >
        <h1 className='text-xl p-2 text-center border-b-2'>
          Bejelentkezés
        </h1>
        <div className='flex flex-col md:flex-row gap-2 justify-between'>
          <p className='flex text-center items-center'>E-mail:</p>
          <div>
            <input 
              type="email" 
              className='border-2 p-1 rounded-md'
              autoComplete='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoginError({status: 0, message: ''})
              }}
            />
            <span className={cn(
              'flex text-sm rounded-b-md rounded-t-sm justify-center items-center bg-red-300 h-0 overflow-hidden transition-all duration-500',
              {
              'h-[25px] p-1': loginError.status == 409
              }
            )}>
              {loginError.message}
            </span>
          </div>
        </div>
        <div className='flex justify-between flex-col md:flex-row'>
          <p className='flex text-center items-center'>Jelszó:</p>
          <div>
          <input 
            type="password" 
            className='border-2 p-1 rounded-md'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setLoginError({status: 0, message: ''})
            }}
          />
            <span className={cn(
              'flex text-sm rounded-b-md rounded-t-sm justify-center items-center bg-red-300 h-0 overflow-hidden transition-all duration-500',
              {
              'h-[25px] p-1': loginError.status == 401 
              }
            )}>
              {loginError.message}
            </span>
          </div>
        </div>
        <button className='p-2 rounded-lg bg-slate-600 text-white mx-auto hover:bg-slate-700'>
          Bejelentkezés
        </button>
      </form>
      <section className='flex flex-col mt-5 gap-2'>
        <p className='text-center'>
          Nincs fiókod?
        </p>
        <button
          onClick={onFormChange}
          className='p-2 rounded-lg bg-slate-600 text-white mx-auto hover:bg-slate-700'
        >
          Regisztráció
        </button>
      </section>
    </section>
  )
}

export default LoginForm