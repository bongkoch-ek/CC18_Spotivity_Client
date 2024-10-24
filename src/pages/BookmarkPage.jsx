import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useActivityStore from '../stores/activityStore'
import useUserStore from '../stores/userStore'
import JoinBox from '../components/JoinBox'
import LoadingPage from './LoadingPage'

export default function BookmarkPage() {

    const getBookmarkList = useActivityStore(state => state.getBookmarkList)
    const bookmarkList = useActivityStore(state => state.bookmarkList)
    const token = useUserStore(state => state.token)
    const loading = useActivityStore(state => state.loading)

    useEffect(() => { getBookmarkList(token) }, [])

//   useEffect(() => {
//     const timer = setTimeout(() => {
//         getBookmarkList(token) 
//     }, 2000); 

//     return () => clearTimeout(timer);
//   }, []);

    return (
        <div className='ml-80 px-20 pt-20 w-full'>
            {
                loading && <LoadingPage />
            }
            <p className='text-3xl font-bold'> Your events</p>
            {
                bookmarkList.length == 0 ?
                    <div>
                        <p className='mt-5 text-gray-500'>You have not bookmark any events</p>
                        <Link to='/activity' className='text-[#00989d] underline'>Discover new events</Link>
                    </div> :

                    bookmarkList.map(el => (
                        <div key={el.id} className='mt-5 w-full'>
                            <JoinBox activity={el.Activity} id={el.id} isFromJoin={false} />
                        </div>
                    ))
            }
        </div>
    )
}
