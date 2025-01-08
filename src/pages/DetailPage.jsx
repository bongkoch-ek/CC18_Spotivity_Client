import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BookmarkDark, BookmarkLight, Question, SearchIcon } from '../icons';
import { Badge } from "@/components/ui/badge"
import MapCard from '../components/MapCard';
import useActivityStore from '../stores/activityStore';
import useUserStore from '../stores/userStore';
import { toast } from 'react-toastify';
import Modal from '../components/AlertDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function detailPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const activity = location.state;
  const joinActivity = useActivityStore(state => state.joinActivity)
  const cancelBookmark = useActivityStore(state => state.cancelBookmark)
  const bookmarkActivity = useActivityStore(state => state.bookmarkActivity)
  const getAllActivity = useActivityStore(state => state.getAllActivity)
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)

  const [confirm, setConfirm] = useState(false)

  const isJoin = () => activity.join.findIndex(el => el.userId === user?.id) !== -1
  const isBookmark = () => activity.bookmark.findIndex(el => el.userId === user?.id) !== -1
  const [bookmark, setBookmark] = useState(isBookmark())
  const [join, setJoin] = useState(isJoin())
  const [test, setTest] = useState(false)

  console.log(activity)

  async function hdlJoin(e) {
    setConfirm(true)

    // setJoin(true)
  }

  async function hdlSubmit() {
    try {
      if (!user) {
        navigate("/login")
      }
      else {
        await joinActivity(token, activity.id)
        setJoin(true)
        toast.success("join success!")
      }
      getAllActivity()
      setTest(true)
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message
      console.log(errMsg)
      toast.error(errMsg)
    } finally {
      setConfirm(false)
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


  function hdlCanCel() {
    setConfirm(false)
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
                <p className='font-medium'>{activity.user.username}</p>
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
                  (activity.quantity == activity.amount) && !activity.isUnLimit ?
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
      <div className=' w-full mt-5'>
        <p className='font-semibold text-lg'>Member</p>
        <div className='flex gap-3'>

          {
            activity?.join.map(el => (<div className='flex flex-col justify-center items-center'>
              <img src="https://picsum.photos/100" className='rounded-full h-14 w-14 items-center' />
              <p>{el.user.username}</p>
            </div>
            ))
          }
          {
            test && <div className='flex flex-col justify-center items-center'>
              <img src="https://picsum.photos/100" className='rounded-full h-14 w-14 items-center' />
              <p>{user.username}</p>
            </div>
          }
        </div>
      </div>


      {
        confirm &&
        <AlertDialog open={confirm}>
          <AlertDialogTrigger asChild>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-3xl text-center">Confirm</AlertDialogTitle>
              <AlertDialogDescription className="text-lg text-center align-middle items-center flex flex-col justify-center">
                <Question className='w-32 h-32 p-5' />
                confirm to join this activity?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <button onClick={hdlCanCel} className='mr-2 px-2 py-1 rounded-3xl hover:text-[#b0cbcb] hover:underline  '>cancel</button>
              <button className='rounded-3xl bg-[#005657] text-white px-4 py-2 font-medium hover:bg-[#004d4e]' onClick={hdlSubmit}> OK </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }


    </div>
  )
}
