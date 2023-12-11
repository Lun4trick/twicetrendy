'useClient'
import Link from 'next/link'
import { links } from '@utils/links'
import cn from 'classnames'
import { usePathname } from 'next/navigation';
import Personal from './Personal';

interface Props {
  isMenuOpen: boolean;
}

const MobileMenu: React.FC<Props> = ({ isMenuOpen }) => {
  const currentPath = usePathname();
  
  return (
    <div className={cn(
      isMenuOpen ? 'h-[100px] pt-2' : 'h-0',
      'flex flex-col transition-all duration-500 overflow-hidden justify-between md:hidden'
      )}>
      <div className='flex gap-3 justify-between items-center'>
      {
        links.map(link => 
          <Link 
            href={link[1]} 
            key={link[1]}
            className={cn(currentPath == link[1] ? 'border-b-black' : '', 
            'flex flex-col font-poppins border-b-2 border-b-transparent hover:border-b-black transition-all duration-300 text-center'
            )}
          >
            {link[0]}
          </Link>)
        }
      </div>
      <Personal/>
    </div>
  )
}

export default MobileMenu