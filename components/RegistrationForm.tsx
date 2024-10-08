import { regFormCheck } from '@customFunctions/regFormCheck';
import { RegErrorType } from '@utils/authForm';
import { RegData } from '@utils/regDataType';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

interface Props {
  onFormChange: () => void
}

const {
  NONE,
  EMAIL_MISMATCH,
  PASSWORD_MISMATCH,
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
  const [userExist, setUserExist] = useState<boolean>(false);

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
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [gdprAszfAccepted, setGdprAszfAccepted] = useState(false);
  const [
    marketingEmailAccepted, 
    setMarketingEmailAccepted
  ] = useState(false);
  const router = useRouter();

  const handleGdprCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGdprAszfAccepted(e.target.checked);
  }

  const handleMarketingCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketingEmailAccepted(e.target.checked);
  }
  
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regCheck = regFormCheck(email, password);
        setUserExist(false);
        if(regCheck.email.error || regCheck.password.error) {
          setFormError(regFormCheck(email, password));
        } else if (!repeatError.email.error && !repeatError.password.error) {
          try {
            const res = await fetch('/api/register/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                firstName, lastName, email, password, gdprAszfAccepted, marketingEmailAccepted
              })
            });

            const resBody = await res.json();
      
            if (res.ok) {
              setEmail('');
              setEmailCheck('');
              setPassword('');
              setPasswordCheck('');
              router.push(resBody.data)
            } else if (res.status === 409) {
              setUserExist(true);
            } else {
              console.log(res.status, res.statusText);
            }
          } catch (error) {
            console.log('something gone wrong during reg', error)
          }
    }
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

  return (
    <section className='relative'>
          <p className={cn(
            'text-center mt-6 relative flex justify-center items-center bg-red-300 text-sm md:text-lg transition-all rounded-lg duration-500 h-0 overflow-hidden',
            {
              'h-[35px] p-2': userExist
            }
          
          )}>
            Ez az E-mail cím már használatban van!
          </p>
      <form
        onSubmit={handleSubmit}
        autoComplete='on'
        className='flex max-w-fit border-b-2 mx-auto flex-col gap-3 p-5'
        method='POST'
      >
        <h1 className='text-xl p-2 text-center border-b-2'>
          Regisztráció
        </h1>

        <div className='flex flex-col md:flex-row gap-2 justify-between items-center'>
          <p className='text-center'>Vezetéknév:</p>
          <div className='flex flex-col'>
            <input 
              type="text" 
              className='border-2 p-1 rounded-md'
              value={lastName}
              autoComplete='family-name'
              onChange={(e) => {setLastName(e.target.value)}}
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-2 justify-between items-center'>
          <p className='text-center'>Keresztnév:</p>
            <div className='flex flex-col'>
              <input 
                type="text" 
                className='border-2 p-1 rounded-md'
                value={firstName}
                autoComplete='given-name'
                onChange={(e) => {setFirstName(e.target.value)}}
              />
            </div>
          </div>

        <div className='flex flex-col md:flex-row gap-2 justify-between items-center'>
          <p className='text-center'>E-mail:</p>
          <div className='flex flex-col'>
            <input 
              type="email" 
              className='border-2 p-1 rounded-md'
              value={email}
              autoComplete='email'
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

        <div className='flex flex-col md:flex-row gap-2 justify-between items-center'>
          <p className='text-center'>E-mail megerősítés:</p>
          <div className='flex flex-col'>
            <input 
              type="email" 
              className='border-2 p-1 rounded-md'
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

        <div className='flex flex-col md:flex-row justify-between items-center'>
          <p className='text-center'>Jelszó:</p>
          <div className='flex flex-col'>
            <input 
              type="password" 
              className='border-2 p-1 rounded-md'
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

        <div className='flex flex-col md:flex-row justify-between items-center'>
          <p className='text-center'>Jelszó megerősítés:</p>
          <div>
            <input 
              type="password" 
              className='border-2 p-1 rounded-md'
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
        <div className='flex flex-col gap-4 max-w-[430px] mt-5 border-2 p-4'>
          <label className='flex gap-4 w-fit cursor-pointer'>
            <input type="checkbox" onChange={handleMarketingCheckbox}/>
            <p className='flex text-sm'>
            Elfogadom a TwiceTrendy legjobb ajánlatairól, promócióiról és híreiről való információ küldését az e-mail címemre. 
            </p>
          </label>
          <label className='flex gap-4 w-fit cursor-pointer'>
            <input type="checkbox" onChange={handleGdprCheckbox}/>
            <p className='flex text-sm'>
              Elfogadom az Általános Szerződési Feltételeket, és elfogadom az Adatvédelmi irányelveket.
            </p>
          </label>
        </div>

        <button 
          className='p-2 mt-5 rounded-lg bg-slate-600 text-white mx-auto hover:bg-slate-700'
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