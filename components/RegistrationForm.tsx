import { regFormCheck } from '@customFunctions/regFormCheck';
import { RegErrorType } from '@utils/authForm';
import { RegData } from '@utils/regDataType';
import cn from 'classnames';
import { useEffect, useState } from 'react';

interface Props {
  onFormChange: () => void
}

const {
  NONE,
  EMAIL_EMPTY,
  EMAIL_INVALID,
  EMAIL_MISMATCH,
  PASSWORD_EMPTY,
  PASSWORD_INVALID,
  PASSWORD_MISMATCH,
  PASSWORD_SHORT
} = RegErrorType;

const RegistrationForm: React.FC<Props> = ( {onFormChange} ) => {
  const [formError, setFormError] = useState<RegData>({
    email: {
      error: NONE,
      message: '',
    },
    password: {
      error: NONE,
      message: '',
    },
  });

  const [repeatError, setRepeatError] = useState<RegData>({
    email: {
      error: NONE,
      message: '',
    },
    password: {
      error: NONE,
      message: '',
    },
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFormError({
      ...formError,
      email: {
        error: NONE,
        message: '',
      },
    });
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setFormError({
      ...formError,
      password: {
        error: NONE,
        message: '',
      },
    });
  }

  useEffect(() => {
    if ((password !== passwordCheck)) {
      setRepeatError({
        ...repeatError,
        password: {
          error: PASSWORD_MISMATCH,
          message: 'Eltérő jelszó',
        },
      });
    } else {
      setRepeatError({
        ...repeatError,
        password: {
          error: NONE,
          message: '',
        },
      });
    }
  }, [password, passwordCheck]);

  useEffect(() => {
    if ((email !== emailCheck)) {
      setRepeatError({
        ...repeatError,
        email: {
          error: EMAIL_MISMATCH,
          message: 'Eltérő E-mail',
        },
      });
    } else {
      setRepeatError({
        ...repeatError,
        email: {
          error: NONE,
          message: '',
        },
      });
    }
  }, [email, emailCheck]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const regCheck = regFormCheck(email, password);

    if(regCheck.email.error || regCheck.password.error) {
      setFormError(regFormCheck(email, password));
    } else if (!repeatError.email.error && !repeatError.password.error) {
      try {
        const res = await fetch('api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email, password
          })
        });
  
        if (res.ok) {
          setEmail('');
          setEmailCheck('');
          setPassword('');
          setPasswordCheck('');
        } else {
          console.log("reg failed")
        }
      } catch (error) {
        console.log('something gone wrong during reg', error)
      }
    }
  }

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-3 p-5'
        method='POST'
      >
        <h1 className='text-xl p-2 text-center border-b-2'>
          Regisztráció
        </h1>

        <div className='flex flex-col md:flex-row gap-2 justify-between'>
          <p className='text-center'>E-mail:</p>
          <div className='flex flex-col'>
            <input 
              type="text" 
              className='border-2 px-1'
              value={email}
              onChange={handleEmailChange}
            />
            <span className={cn(
              'flex text-sm rounded-b-md rounded-t-sm justify-center items-center bg-red-300 h-0 overflow-hidden transition-all duration-500',
              {
              'h-[25px] p-1': formError.email.error 
            }
            )}>
              {formError.email.message}
            </span>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-2 justify-between'>
          <p className='text-center'>E-mail megerősítés:</p>
          <div className='flex flex-col'>
            <input 
              type="text" 
              className='border-2 px-1'
              value={emailCheck}
              onChange={(e) => {setEmailCheck(e.target.value)}}
            />
            <span className={cn(
              'flex text-sm rounded-b-md rounded-t-sm justify-center items-center bg-red-300 h-0 overflow-hidden transition-all duration-500',
              {
              'h-[25px] p-1': repeatError.email.error 
            }
            )}>
              {repeatError.email.message}
            </span>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between'>
          <p className='text-center'>Jelszó:</p>
          <div className='flex flex-col'>
            <input 
              type="password" 
              className='border-2 px-1'
              value={password}
              onChange={handlePasswordChange}
            />
            <span className={cn(
                'flex text-sm rounded-b-md rounded-t-sm justify-center items-center bg-red-300 h-0 overflow-hidden transition-all duration-500',
                {
                'h-[25px] p-1': formError.password.error 
              }
              )}>
                {formError.password.message}
              </span>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between'>
          <p className='text-center'>Jelszó megerősítés:</p>
          <div>
            <input 
              type="password" 
              className='border-2 px-1'
              value={passwordCheck}
              onChange={(e) => {setPasswordCheck(e.target.value)}}
            />
            <span className={cn(
                'flex text-sm rounded-b-md rounded-t-sm justify-center items-center bg-red-300 h-0 overflow-hidden transition-all duration-500',
                {
                'h-[25px]': repeatError.password.error 
              }
              )}>
                {repeatError.password.message}
            </span>
          </div>
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