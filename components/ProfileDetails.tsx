import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import cn from 'classnames';
import { RegErrorType } from '@utils/authForm';
import { regFormCheck } from '@customFunctions/regFormCheck';

function ProfileDetails() {
  const {data: session, status} = useSession();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [formError, setFormError] = useState({
    email: {
      error: RegErrorType.NONE,
      message: '',
    },
  })

  const [repeatError, setRepeatError] = useState({
    email: {
      error: RegErrorType.NONE,
      message: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!repeatError.email.error) {
          try {
            const res = await fetch('/api/editProfile/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                firstName, lastName, email
              })
            });

            const resBody = await res.json();
      
            if (res.ok) {
              setEmail('');
              setEmailCheck('');
            } else {
              console.log(res.status, res.statusText);
            }
          } catch (error) {
            console.log('something gone wrong during reg', error)
          }
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    switch (true){
      case e.target.value === '':
        setFormError({
          email: {
            error: RegErrorType.EMAIL_EMPTY,
            message: 'Email cím kötelező!',
          },
        });
        break;
      
      case e.target.value !== emailCheck && emailCheck !== '':
        setRepeatError({
          email: {
            error: RegErrorType.EMAIL_MISMATCH,
            message: 'A két email cím nem egyezik!',
          },
        });
        break;

      default:
        setFormError({
          email: {
            error: RegErrorType.NONE,
            message: '',
          },
        });
    }
  }

  const handleEmailCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCheck(e.target.value);

    switch (true){
      case e.target.value === '':
        setRepeatError({
          email: {
            error: RegErrorType.EMAIL_EMPTY,
            message: 'Email cím kötelező!',
          },
        });
        break;
      
      case e.target.value !== email && email !== '':
        setRepeatError({
          email: {
            error: RegErrorType.EMAIL_MISMATCH,
            message: 'A két email cím nem egyezik!',
          },
        });
        break;

      default:
        setRepeatError({
          email: {
            error: RegErrorType.NONE,
            message: '',
          },
        });
    }
  }
  
  return (
    <section>
      <form
        onSubmit={handleSubmit}
        autoComplete='on'
        className='flex max-w-fit border-b-2 mx-auto flex-col gap-3 p-5'
        method='POST'
      >
        <h1 className='text-xl p-2 border-b-2'>
          Profil adatok
        </h1>

        <div className='flex flex-col md:flex-row gap-2 justify-between items-center'>
          <p className='text-center'>Vezetéknév:</p>
          <div className='flex flex-col'>
            <input
              placeholder={session?.user.lastName}
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
                placeholder={session?.user.firstName}
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
              placeholder={session?.user.email}
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
              onChange={handleEmailCheckChange}
            />
            <span className={cn(
              'flex text-sm rounded-b-md rounded-t-sm justify-center items-center bg-red-300 h-0 overflow-hidden transition-all duration-500 w-full',
              {
              'h-[25px] p-1': repeatError.email.error 
            }
            )}>
              {repeatError.email.message}
            </span>
          </div>
        </div>

        <button 
          className='p-2 mt-5 rounded-lg bg-slate-600 text-white mx-auto hover:bg-slate-700'
          >
          Mentés
        </button>
      </form>
    </section>
  )
}

export default ProfileDetails