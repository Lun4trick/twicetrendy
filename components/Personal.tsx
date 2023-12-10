import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Personal = () => {
  const { data: session, status } = useSession()
  const user = session?.user
  return (
    <div className='flex gap-6 items-center justify-center'>
      <Link href='/user/auth'>
         <Image 
          src={user ? '/assets/images/user_icon.svg' : '/assets/images/login.svg'}
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