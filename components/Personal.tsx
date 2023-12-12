import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

type PersonalProps = {
  userMenuHandler: () => void;
}

const Personal = ({userMenuHandler}: PersonalProps) => {
  const { data: session, status } = useSession()
  const user = session?.user
  return (
    <div className='flex gap-6 items-center justify-center'>
      {user 
        ? (
        <button 
          onClick={() => userMenuHandler()}
          className='bg-transparent p-2'
        >
          <Image 
            src='/assets/images/user.svg'
            alt='user_icon' 
            width={32} 
            height={32}
            className='rounded-full bg-green-100 hover:scale-125 transition-transform duration-200 min-w-[24px]'
            />
        </button>)
        : (
          <Link 
            href='/user/auth'
            className='bg-transparent p-2'
          >
            <Image 
              src='/assets/images/user.svg'
              alt='user_icon' 
              width={32} 
              height={32}
              className='rounded-full hover:scale-125 transition-transform duration-200 min-w-[24px]'
            />
          </Link>
          )}
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