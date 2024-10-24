import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useActivityStore from '../stores/activityStore'
import useUserStore from '../stores/userStore'
import JoinBox from '../components/JoinBox'
import LoadingPage from './LoadingPage'

export default function AttendingPage() {

  const getJoinList = useActivityStore(state => state.getJoinList)
  const joinList = useActivityStore(state => state.joinList)
  const token = useUserStore(state => state.token)
  const loading = useActivityStore(state => state.loading)

  useEffect(() => { getJoinList(token) }, [])

  return (
    <div className='ml-80 px-20 pt-20 w-full '>
      {
        loading && <LoadingPage />
      }
      <p className='text-3xl font-bold'> Your events</p>
      {
        joinList.length == 0 ?
          <div >
            <p className='mt-5 text-gray-500'>You have not registered for any events</p>
            <Link to='/activity' className='text-[#00989d] underline'>Discover new events</Link>
          </div> :

          joinList.map(el => (
            <div key={el.id} className='mt-5 w-full'>
              <JoinBox activity={el.Activity} id={el.id} isFromJoin={true} />
            </div>
          ))
      }
    </div>
  )
}
