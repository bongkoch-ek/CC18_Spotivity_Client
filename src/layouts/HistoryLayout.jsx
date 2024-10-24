import React from 'react'
import SideBarProfile from '../components/SideBarProfile'
import AttendingPage from '../pages/AttendingPage'

export default function HistoryLayout() {
    return (
        <div>
            <div className='flex  h-[calc(100vh-78px)]'>
                <SideBarProfile />
                <AttendingPage />
            </div>
        </div>
    )
}
