import React from 'react'
import SideBarProfile from '../components/SideBarProfile'
import HostingPage from '../pages/HostingPage'

export default function HostingLayout() {
    return (
        <div className='flex justify-between h-[calc(100vh-78px)]'>
            <SideBarProfile />
            <HostingPage />
        </div>
    )
}
