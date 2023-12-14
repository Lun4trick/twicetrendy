"use client"
import Adbar from '@components/AdBar'
import CategoryContainer from '@components/CategoryContainer'
import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel'

const Home = () => {
  return (
    <section>
      <Adbar/>
      <CategoryContainer/>
    </section>
  )
}

export default Home