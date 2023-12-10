import Image from 'next/image';

const RegistrationComplete = () => {
  return (
    <section className='flex mt-8 flex-col w-full justify-center items-center'>
      <h1 className='text-2xl md:text-4xl'>
        Sikeres regisztráció!
        </h1>
      <p className='text-sm md:text-lg text-center mt-4'>
        Nincs más teendőd, mint visszaigazolni az e-mail címed, azzal a linkel amit az email címedre küldtünk.
      </p>
      <p className='text-center text-xs mt-2'>
        Ha nem találod az e-mailt, akkor ellenőrizd a spam mappádat is.
      </p>
      <Image
        className='mt-4 md:mt-8'
        src="/assets/images/green_check_mark.svg" 
        alt="zöld_pipa" 
        height={120}
        width={120}
      />
    </section>
  )
};

export default RegistrationComplete;