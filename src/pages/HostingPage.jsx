import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useActivityStore from '../stores/activityStore'
import useUserStore from '../stores/userStore'
import OwnBox from '../components/OwnBox'

export default function HostingPage() {

    const getActivityByUserId = useActivityStore(state => state.getActivityByUserId)
    const ownList = useActivityStore(state => state.ownList)
    const token = useUserStore(state => state.token)

    useEffect(() => { getActivityByUserId(token) }, [])

    return (
        <div className='ml-80 px-20 pt-20 w-full mb-3'>
            <p className='text-3xl font-bold'> Your events</p>
            {
                ownList.length == 0 ?
                    <div>
                        <p className='mt-5 text-gray-500'>You are not hosting any upcoming events</p>
                        <Link to='/create-activity' className='text-[#00989d] underline'> Create a group to get started</Link>
                    </div> :

                    ownList.map(el => (
                        <div key={el.id} className='mt-5 w-full'>
                            <OwnBox key={el.id} activity={el} />
                        </div>
                    ))
            }
        </div>
    )
}
