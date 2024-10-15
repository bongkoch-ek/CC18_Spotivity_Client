import React from 'react'
import { Link } from 'react-router-dom'

export default function AttendingPage() {
  return (
    <div className='px-20 pt-20'>
      <p className='text-3xl font-bold'> Your events</p>
      <p className='mt-5 text-gray-500'>You have not registered for any events</p>
      <Link to='/activity' className='text-[#00989d] underline'>Discover new events</Link>
    </div>
  )
}
