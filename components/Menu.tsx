"use client"
import Link from 'next/link';
import { links } from '@utils/links';
import cn from 'classnames';
import { usePathname } from "next/navigation"

const Menu = () => {
  const currentPath = usePathname();

  return (
    <div className='md:flex justify-between gap-3 grow hidden'>
      {
        links.map(link => 
          <Link 
            href={link[1]} 
            key={link[1]}
            className={cn(currentPath == link[1] ? 'border-b-black' : '', 
            'box-border font-poppins border-b-2 border-b-transparent hover:border-b-black transition-all duration-300'
            )}
          >
            {link[0]}
          </Link>)
      }
    </div>
  )
}

export default Menu