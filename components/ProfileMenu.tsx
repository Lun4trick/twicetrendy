import cn from 'classnames'
import profileLinks from '@utils/profileLinks'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

type Props = {
  isProfileMenuOpen: boolean;
  profileMenuHandler: () => void;
}

function ProfileMenu({ isProfileMenuOpen, profileMenuHandler }: Props) {
  const {data: session} = useSession();

  return (
    <>
    <div className={cn(
      'fixed end-0 transition-all duration-700 transform top-0 z-[50] h-screen w-full bg-black',
      isProfileMenuOpen ? 'opacity-80' : 'opacity-0 pointer-events-none'
    )}/>
    <div className={cn(
      'fixed p-2 top-0 end-0 transition-all rounded-l-xl duration-1000 transform h-full max-w-xs z-[60] bg-white border-s overflow-hidden',
      isProfileMenuOpen ? 'translate-x-0 w-full' : 'translate-x-full w-0'
        )}
        >
          <button 
            type="button"
            onClick={() => profileMenuHandler()}
            className="flex justify-center items-center w-10 h-10 text-lg font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span className="sr-only">Close modal</span>
            <svg 
              className="flex-shrink-0 w-5 h-5" 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>

          </button>
          <div className='min-w-[300px]'>
            <Image
            className='flex max-w-[150px] md:max-w-[200px] mx-auto'
              src='/assets/images/Logo.svg'
              alt='logo'
              width={200}
              height={200}
            />
          </div>
          <div className='flex gap-2 flex-col justify-center items-center min-w-[300px] mt-8'>
            <p className='text-2xl'>Üdvözlünk</p>
            <p className='text-xl'>{session?.user.firstName}</p>
          </div>
          <div className='flex mt-8 flex-col w-full h-full items-center gap-4 overflow-hidden'>
            {profileLinks.map((link) => (
              <Link
                onClick={() => profileMenuHandler()}
                className='flex text-lg font-semibold p-2 border-[1px]  rounded-full hover:bg-gray-100 border-gray-400 text-gray-600 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 w-full min-w-[300px]'
                key={link.path} 
                href={link.path}
              >
                {link.name}
              </Link>
            ))}
            <button 
              className='flex text-lg font-semibold p-2 border-[1px]  rounded-full hover:bg-red-100 border-red-400 text-gray-600 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 min-w-[300px]'
              onClick={() => signOut()}
            >
              Kijelentkezés
            </button>
          </div>
      </div>
    </>
  )
}

export default ProfileMenu