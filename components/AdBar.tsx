'use client'
import {useState, useEffect} from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

const Adbar = () => {
  const ads = [
    '/assets/images/marketing/1.png',
    '/assets/images/marketing/2.png',
  ];

  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (currentAd === ads.length - 1) {
        setCurrentAd(0)
      } else {
        setCurrentAd(currentAd + 1)
      }
    }, 5000)
  }, [ads.length, currentAd])

  return (
    <section 
      className={cn('w-full mt-3')}
    >
      <div className='relative flex align-middle group items-center justify-center'>
        <Image src={ads[currentAd]} alt='adv' width={1200} height={600} className='rounded-md transition-all duration-500 group-hover:blur-sm'/>
        <Link href={'/termekek'} className='absolute flex w-full h-full md:w-fit md:h-fit items-center justify-center text-2xl font-poppins md:border-2 border-slate-800 bg-transparent rounded-md p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-slate-400 bg-opacity-25 hover:bg-opacity-50 text-black'>
          Termékekhez
        </Link>
      </div>
    </section>
  )
}

export default Adbar