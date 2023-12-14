'use client'
import ProfileDetails from '@components/ProfileDetails';
import React, { useEffect, useState } from 'react'

function Profile() {
  const [currentPage, setCurrentPage] = useState<string>('');

  useEffect(() => {
    const urlToken = window.location.href.split('=')[1];
    setCurrentPage(urlToken);
  }, [])

  return (
    currentPage === 'profileDetails' 
      && <ProfileDetails />
  )
}

export default Profile