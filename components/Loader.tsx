import React from 'react'

function Loader() {
  return (
  <div className='flex w-full space-x-2 justify-center items-center bg-transparent h-screen'>
 	  <span className='sr-only'>Loading...</span>
  	<div className='h-4 w-4 md:h-8 md:w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
    <div className='h-4 w-4 md:h-8 md:w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
    <div className='h-4 w-4 md:h-8 md:w-8 bg-black rounded-full animate-bounce'></div>
  </div>
  )
}

export default Loader