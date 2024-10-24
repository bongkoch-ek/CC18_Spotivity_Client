import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BookmarkDark, BookmarkLight, SearchIcon } from '../icons';
import { Badge } from "@/components/ui/badge"
import MapCard from '../components/MapCard';
import useActivityStore from '../stores/activityStore';
import useUserStore from '../stores/userStore';
import { toast } from 'react-toastify';

export default function detailPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const activity = location.state;
  const joinActivity = useActivityStore(state => state.joinActivity)
  const cancelBookmark = useActivityStore(state => state.cancelBookmark)
  const bookmarkActivity = useActivityStore(state => state.bookmarkActivity)
  const getAllActivity= useActivityStore(state => state.getAllActivity)
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)
  
  const isJoin = () => activity.join.findIndex(el => el.userId === user?.id) !== -1
  const isBookmark = () => activity.bookmark.findIndex(el => el.userId === user?.id) !== -1
  const [bookmark,setBookmark] = useState(isBookmark())
  const [join,setJoin] = useState(isJoin())

  console.log(activity)
  async function hdlJoin(e) {
    try {
      e.stopPropagation()
      if (!user) {
        navigate("/login")
      }
      else {
        await joinActivity(token, activity.id)
        setJoin(true)
        toast.success("join success!")
      }
      getAllActivity()
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message
      console.log(errMsg)
      toast.error(errMsg)
    }
  }

  async function hdlBookmark(e) {
    e.stopPropagation()
    try {
      if (!user) {
        navigate("/login")
      }
      else {
        if (bookmark) {
          await cancelBookmark(token, activity.id)
          setBookmark(false)
        }
        else {
          await bookmarkActivity(token, activity.id)
          setBookmark(true)
          toast.success("bookmark success!")
        }
        getAllActivity()
      }

    } catch (err) {
      const errMsg = err.response?.data?.message || err.message
      console.log(errMsg)
      toast.error(errMsg)
    }
  }

  let formattedJson = JSON.parse(activity.description);
  const formattedText = formattedJson.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className='w-full pt-8 px-44 pb-10'>
      <div className='w-full mb-5'>
        <div className='flex justify-between '>
          <div className='flex flex-col gap-3'>
            <p className='font-bold text-4xl'>{activity.title}</p>
            <div className='flex gap-3 items-center'>
              <img src="https://picsum.photos/100" alt="user_profile" className='w-10 h-10 rounded-full' />
              <div>
                <p className=''>host by </p>
                <p className='font-medium'>{activity.User.username}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-6 items-center'>
            <button onClick={hdlBookmark}>
              {
                bookmark ? <BookmarkDark className="border rounded-full p-2  w-12 h-12 " /> : <BookmarkLight className="border rounded-full p-2 w-12 h-12 " />
              }
            </button>
            {
              join ?
                <button className=' bg-[#D9D9D9] text-white text-center py-3 px-10 rounded-3xl' disabled >join</button>
                :
                (
                  activity.quantity == activity.amount ?       
                   <button className=' bg-[#D9D9D9] text-white text-center py-3 px-10 rounded-3xl' disabled >join</button>
                  :
                  <button className='bg-[#00898d] text-white text-center py-3 px-10 rounded-3xl font-semibold' onClick={hdlJoin}>join</button>
              )
                // <button className='bg-[#00898d] text-white text-center py-3 px-10 rounded-3xl font-semibold' onClick={hdlJoin}>join</button>
            }

          </div>
        </div>
      </div>


      <div className='flex gap-10 w-full justify-between'>

        <div className='flex flex-col gap-3 w-[70%]'>
          <img className='rounded-2xl w-3/5 max-h-[400px] object-cover' src={activity.imgUrl} alt="Image" />
          <p className='items-center text-center border rounded-3xl bg-[#b0cbcb] text-white font-medium max-w-28'>{activity.activityType.nameEng}</p>
          <p className='font-semibold text-xl'>Description</p>
          <p id='description'>{formattedText} </p>
        </div>

        <div className='w-[30%]'>
          <MapCard activity={activity} />
        </div>


      </div>

    </div>
  )
}
