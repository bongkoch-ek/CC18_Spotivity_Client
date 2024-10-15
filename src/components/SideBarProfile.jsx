import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBarProfile() {
    return (
        <div className='flex flex-col gap-5 px-20 pt-20 bg-slate-400'>
            <div className='flex flex-col items-center gap-2'>
                <div className='bg-pink-50 w-52 h-52 text-center border rounded-full '>
                    Img pic
                </div>
                <p className='text-2xl font-semibold'> Username</p>
                <p className='text-lg'>test@gmail.com</p>
            </div>

            <div className='flex flex-col'>
                <Link> Edit Profile</Link>
                <Link to='/history'> Attending</Link>
                <Link to='/history/hosting'> Hosting</Link>
                <Link to='/history/bookmark'> Bookmark</Link>
                <Link to='/history/past-event'> Past</Link>
            </div>
        </div>
    )
}
