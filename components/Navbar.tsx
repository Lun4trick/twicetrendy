'use client'
import Link from 'next/link';
import cn from 'classnames'
import Menu from './Menu';
import Personal from './Personal';
import { useState } from 'react';
import Image from 'next/image';
import MobileMenu from './MobileMenu';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuHandler = () => {
    setIsProfileMenuOpen((prev) => !prev)
  }

  return (
    <div className='w-full'>
      <div className=' flex justify-between pt-2 pb-2 sm:p-6 md:p-8 items-center md:gap-24 gap-8 border-b-2'>
        <Link 
          href="/"
          className='flex font-mont font-bold text-lg md:text-2xl'
        >
          <Image
          className='max-w-[80px] md:max-w-[120px]'
            src='/assets/images/Logo.svg'
            alt='logo'
            width={120}
            height={50}
          />
        </Link>
        <Menu/>
        <button 
          className={cn(
            isMenuOpen ? 'rotate-180': '',
            'md:hidden transition-all duration-300 p-2 rounded-2xl bg-gray-900 text-white'
          )}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
          }}
        >
          {isMenuOpen ? 'X' : 'Menu'}
        </button>
        <div className='flex'>
          <Personal userMenuHandler={profileMenuHandler}/>
        </div>
      </div>
      <ProfileMenu 
        isProfileMenuOpen={isProfileMenuOpen}
        profileMenuHandler={profileMenuHandler}
      />
      <MobileMenu isMenuOpen={isMenuOpen}/>
    </div>
  )
}

export default Navbar