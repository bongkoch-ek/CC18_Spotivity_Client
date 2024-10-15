import React from 'react'
import { Link } from 'react-router-dom'

export default function HostingPage() {
    return (
        <div className='px-20 pt-20'>
            <p className='text-3xl font-bold'> Your events</p>
            <p className='mt-5 text-gray-500'>You are not hosting any upcoming events</p>
            <Link to='/create-activity' className='text-[#00989d] underline'> Create a group to get started</Link>
        </div>
    )
}
