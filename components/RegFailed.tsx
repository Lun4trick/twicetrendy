import React from 'react'
import Image from 'next/image'

function RegFailed() {
  return (
    <section className='flex mt-8 flex-col w-full justify-center items-center'>
      <h1 className='text-2xl md:text-4xl'>
        Valami hiba történt!
      </h1>
      <p className='text-sm md:text-lg text-center mt-4'>
        Ha a hiba a regisztrációt követően keletkezett, kérlek jelezd a hibát az alábbi e-mail címen: 
      </p>
      <p className=' text-3xl'>
          help@twicetrendy.hu
      </p>
      <Image
        className='mt-4 md:mt-8'
        src="/assets/images/red_x_mark.svg" 
        alt="hiba_ikon" 
        height={120}
        width={120}
      />
    </section>
  )
}

export default RegFailed