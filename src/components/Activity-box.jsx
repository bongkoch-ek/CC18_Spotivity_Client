import React from 'react'
import { BookmarkDark, BookmarkLight } from '../icons'
import { useNavigate } from "react-router-dom";
import useActivityStore from '../stores/activityStore';
import useUserStore from '../stores/userStore';
import { toast } from 'react-toastify';

export default function Activity_box(props) {

    const { activity } = props

    const navigate = useNavigate();
    const token = useUserStore(state => state.token)
    const joinActivity = useActivityStore(state => state.joinActivity)
    const bookmarkActivity = useActivityStore(state => state.bookmarkActivity)
    const cancelBookmark = useActivityStore(state => state.cancelBookmark)
    const user = useUserStore(state => state.user)
    const getAllActivity = useActivityStore(state => state.getAllActivity)

    const isJoin = () => activity.join.findIndex(el => el.userId === user?.id) !== -1
    const isBookmark = () => activity.bookmark.findIndex(el => el.userId === user?.id) !== -1

    const description = (str) => {
        if (str.length > 200) {
            return str.slice(0, 200) + "..."
        }
        else {
            return str;
        }
    }

    function hdlDetailClick() {
        if (activity.User.username == user?.username) {
            navigate('/edit-activity', { state: activity })
        }
        else
            navigate("/detail", { state: activity });
    }

    async function hdlJoin(e) {
        try {
            // e.stopPropagation()
            // if (!user) {
            //     navigate("/login")
            // }
            // else {
            //     await joinActivity(token, activity.id)
            //     toast.success("join success!")
            // }
            // getAllActivity()
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
                if (isBookmark()) {
                    await cancelBookmark(token, activity.id)
                }
                else {
                    await bookmarkActivity(token, activity.id)
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


    return (
        <div key={activity.id} className='border rounded-3xl p-8 flex flex-row shadow-md gap-9 w-full h-72 mb-5 bg-white hover:bg-[#f7f6f66e] hover:-translate-y-1' onClick={hdlDetailClick}>

            <div className='w-1/4 h-full'>
                <img className='rounded-3xl object-cover h-full w-full'
                    src={activity.imgUrl}
                    alt="Image" />
            </div>
            <div className='flex flex-col gap-2 w-3/4 justify-start items-start '>
                <p className='text-[#726E69]'> {new Date(activity.startDate).toLocaleDateString()}</p>
                <div className='flex gap-6 items-baseline'>
                    <p className='font-bold text-3xl'>{activity.title}</p>
                    {/* <p className='text-[#726E69]'> 8 interest</p> */}
                </div>

                <p className='text-[#726E69]'>{activity.User.username}</p>
                <p className='font-medium text-start'>{description(JSON.parse(activity.description))}</p>

                <div className='flex flex-row justify-between mt-5 w-full'>
                    {
                        (activity.quantity == activity.amount) && !activity.isUnLimit ?
                            <p className='text-red-500'>Full</p> :
                            (
                                activity.isUnLimit ? <p>Available</p> : <p>join {activity.quantity}/{activity.amount}</p>
                            )

                    }

                    <div className='flex gap-5'>
                        {
                            !(activity.User.username == user?.username)
                            &&
                            <button className='w-10 h-10' onClick={hdlBookmark}>
                                {
                                    isBookmark() ? <BookmarkDark className="border rounded-full p-2 " /> : <BookmarkLight className="border rounded-full p-2 " />
                                }
                                {/* <BookmarkLight className="border rounded-full p-2 " /> */}
                            </button>
                        }

                        {
                            (activity.User.username == user?.username) ?
                                <button className=' bg-[#b0cbcb] text-white text-center py-2 px-7 rounded-3xl' >edit</button>
                                :
                                (

                                    isJoin() ?
                                        <button className=' bg-[#D9D9D9] text-white text-center py-2 px-7 rounded-3xl' disabled >join</button>
                                        :
                                        (
                                            (activity.quantity == activity.amount) && !activity.isUnLimit ? <button className=' bg-[#D9D9D9] text-white text-center py-2 px-7 rounded-3xl' disabled >join</button>
                                                :
                                                <button className=' bg-[#00898d] text-white text-center py-2 px-7 rounded-3xl' onClick={hdlJoin} >join</button>
                                        )


                                )

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
