import React from 'react'
import { categories } from '@utils/categories'
import Link from 'next/link'
import Image from 'next/image'

const CategoryContainer = () => {
  return (
    <div className='flex justify-between mt-3 flex-wrap gap-y-3'>
      {categories.map(({path, image}) => (
        <Link 
          href={path} 
          className='flex md:w-[24%] w-[48%] hover:scale-105 active:scale-90 transition-transform' 
          key={path}
        >
          <Image src={image} alt={path} height={100} width={500}/>
        </Link>
      ))}
    </div>
  )
}

export default CategoryContainer