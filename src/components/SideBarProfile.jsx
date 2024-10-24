import React from 'react'
import { Link } from 'react-router-dom'
import useUserStore from '../stores/userStore'

export default function SideBarProfile() {
    const user = useUserStore(state => state.user)

    return (
        <div className='fixed w-80 flex flex-col gap-6 px-20 pt-20 bg-[#00989d] h-full text-white'>
            <div className='flex flex-col items-center gap-2'>
                <div className='bg-white w-52 h-52 text-center border rounded-full '>
                    <img src="https://www.svgrepo.com/show/420315/avatar-cloud-crying.svg" alt="profile_image" className='w-52 h-52' />
                </div>
                <p className='text-3xl font-semibold '> {user.username}</p>
                <p className='text-lg'>{user.email}</p>
            </div>

            <div className='flex flex-col gap-3'>
                <Link> <p className='hover:text-[#004d4e]'>Edit Profile </p> </Link>
                <Link to='/history'> <p className='hover:text-[#004d4e]'> Attending</p> </Link>
                <Link to='/history/hosting'><p className='hover:text-[#004d4e]'>Hosting </p> </Link>
                <Link to='/history/bookmark'> <p className='hover:text-[#004d4e]'>Bookmark </p></Link>
                {/* <Link to='/history/past-event'> Past</Link> */}
            </div>
        </div>
    )
}
