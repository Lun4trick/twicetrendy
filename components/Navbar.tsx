'use client'
import Link from 'next/link';
import cn from 'classnames'
import Menu from './Menu';
import Personal from './Personal';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='w-full'>
      <div className=' flex justify-between pt-2 pb-2 sm:p-6 md:p-8 items-center md:gap-24 gap-8 border-b-2'>
        <Link 
          href="/"
          className='flex font-mont font-bold text-lg md:text-2xl'
        >
          Twice Trendy
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
        <div className='hidden md:flex'>
          <Personal/>
        </div>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen}/>
    </div>
  )
}

export default Navbar