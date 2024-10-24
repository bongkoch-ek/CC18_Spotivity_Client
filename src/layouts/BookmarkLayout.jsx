import React from 'react'
import SideBarProfile from '../components/SideBarProfile'
import BookmarkPage from '../pages/BookmarkPage'

export default function BookmarkLayout() {
  return (
    <div>
    <div className='flex  h-[calc(100vh-78px)]'>
        <SideBarProfile />
        <BookmarkPage />
    </div>
</div>
  )
}
