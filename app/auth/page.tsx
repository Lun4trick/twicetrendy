'use client'
import LoginForm from '@components/LoginForm'
import RegistrationForm from '@components/RegistrationForm'
import { useState } from 'react'
import { AuthFormType } from '@utils/authForm'

const Auth = () => {
  const {
    LOGIN,
    REGISTRATION
  } = AuthFormType;

  const [currentForm, setCurrentForm] = useState<AuthFormType>(LOGIN)
  const onRegister = () => {
    setCurrentForm(REGISTRATION)
  }
  const onLogin = () => {
    setCurrentForm(LOGIN)
  }
  return (
    <section className='flex w-full justify-evenly'>
      {
        currentForm == LOGIN
          ? <LoginForm onFormChange={onRegister}/>
          : <RegistrationForm onFormChange={onLogin}/>
        }
    </section>
  )
}

export default Auth