import cn from 'classnames'
import profileLinks from '@utils/profileLinks'
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type Props = {
  isProfileMenuOpen: boolean;
  profileMenuHandler: () => void;
}

function ProfileMenu({ isProfileMenuOpen, profileMenuHandler }: Props) {
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
          <div className='flex flex-col w-full h-full items-center gap-4 overflow-hidden'>
            {profileLinks.map((link) => (
              <Link
                className='flex text-lg font-semibold p-2 border-[1px]  rounded-full hover:bg-gray-100 border-gray-400 text-gray-600 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 w-full min-w-[200px]'
                key={link.path} 
                href={link.path}
              >
                {link.name}
              </Link>
            ))}
            <button 
              className='text-lg font-semibold p-2 border-[1px]  rounded-full hover:bg-red-100 border-red-400 text-gray-600 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300'
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