import {useState} from 'react'

interface Props {
  onFormChange: () => void
}

const LoginForm: React.FC<Props> = ( {onFormChange} ) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <form 
        action="#"
        method='POST' 
        className='flex flex-col gap-3 border-b-2 p-5'
      >
        <h1 className='text-xl p-2 text-center border-b-2'>
          Bejelentkezés
        </h1>
        <div className='flex flex-col md:flex-row gap-2 justify-between'>
          <p className='text-center'>E-mail:</p>
          <input 
            type="email" 
            className='border-2 px-1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex justify-between flex-col md:flex-row'>
          <p className='text-center'>Jelszó:</p>
          <input 
            type="password" 
            className='border-2 px-1'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
    </div>
  )
}

export default LoginForm