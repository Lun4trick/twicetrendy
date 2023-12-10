import Link from 'next/link';
import Image from 'next/image';

const Personal = () => {
  return (
    <div className='flex gap-6 items-center justify-center'>
      <Link href='/user/auth'>
         <Image 
          src='/assets/images/user_icon.svg' 
          alt='user_icon' 
          width={32} 
          height={32}
          className=' hover:scale-125 transition-transform duration-200 min-w-[24px]'
        />
      </Link>
      <Link href='/kosar'>
        <Image 
          src='/assets/images/cart_icon.svg' 
          alt='user_icon' 
          width={32} 
          height={32}
          className=' hover:scale-125 transition-transform duration-200 min-w-[24px]' 
        />
      </Link>
    </div>
  )
}

export default Personal