import { useState } from 'react'

interface Props {
  onFormChange: () => void
}

const RegistrationForm: React.FC<Props> = ( {onFormChange} ) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailCheck, setEmailCheck] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  return (
    <section>
      <form 
        action="#" 
        className='flex flex-col gap-3 p-5'
        method='POST'
      >
        <h1 className='text-xl p-2 text-center border-b-2'>
          Regisztráció
        </h1>

        <div className='flex flex-col md:flex-row gap-2 justify-between'>
          <p className='text-center'>E-mail:</p>
          <input 
            type="text" 
            className='border-2 px-1'
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>

        <div className='flex flex-col md:flex-row gap-2 justify-between'>
          <p className='text-center'>E-mail megerősítés:</p>
          <input 
            type="text" 
            className='border-2 px-1'
            value={password}
            onChange={(e) => {setEmailCheck(e.target.value)}}
          />
        </div>

        <div className='flex flex-col md:flex-row justify-between'>
          <p className='text-center'>Jelszó:</p>
          <input 
            type="password" 
            className='border-2 px-1'
            value={emailCheck}
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>

        <div className='flex flex-col md:flex-row justify-between'>
          <p className='text-center'>Jelszó megerősítés:</p>
          <input 
            type="password" 
            className='border-2 px-1'
            value={passwordCheck}
            onChange={(e) => {setPasswordCheck(e.target.value)}}
          />
        </div>

        <button 
          className='p-2 rounded-lg bg-slate-600 text-white mx-auto hover:bg-slate-700'
          >
          Regisztráció
        </button>
      </form>

      <section className='flex flex-col mt-5 gap-2'>
        <p className='text-center'>
          Már van fiókod?
        </p>

        <button
          onClick={onFormChange}
          className='p-2 rounded-lg bg-slate-600 text-white mx-auto hover:bg-slate-700'
        >
          Bejelentkezés
        </button>
      </section>
    </section>
  )
}

export default RegistrationForm