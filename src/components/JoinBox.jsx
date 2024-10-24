import React from 'react'
import { DeleteIcon } from '../icons';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/userStore';
import useActivityStore from '../stores/activityStore';

export default function OwnBox(props) {

    const { activity, id, isFromJoin } = props

    const token = useUserStore(state => state.token)
    const cancelJoin = useActivityStore(state => state.cancelJoin)
    const cancelBookmark = useActivityStore(state => state.cancelBookmark)

    const navigate = useNavigate();

    const description = (str) => {
        if (str.length > 150) {
            return str.slice(0, 150) + "..."
        }
        else {
            return str;
        }
    }

    function hdlDetailClick() {
        navigate("/detail", { state: activity });
    }

    async function hdlDelete(e) {
        e.stopPropagation()
        if (isFromJoin) {
            await cancelJoin(token, id)
        }
        else {
            await cancelBookmark(token, id)
        }
    }


    return (
            <div key={activity.id} className='border rounded-3xl p-8 flex flex-row shadow-md gap-9 w-4/5 max-h-52 mb-5  hover:bg-[#f7f6f66e] hover:-translate-y-1' onClick={hdlDetailClick}>

                <div className='w-1/4 '>
                    <img className='rounded-3xl object-cover h-full w-full'
                        src={activity.imgUrl}
                        alt="Image" />
                </div>
                <div className='flex flex-col gap-1 w-3/4 justify-start items-start '>
                    <p className='text-[#726E69]'> {new Date(activity.startDate).toLocaleDateString()}</p>
                    <div className='flex gap-6 items-baseline'>
                        <p className='font-bold text-3xl'>{activity.title}</p>
                    </div>

                    <p className='font-medium text-start'>{description(JSON.parse(activity.description))}</p>

                    <div className='flex flex-row justify-between mt-2 w-full'>
                    {
                        (activity.quantity == activity.amount)&& !activity.isUnLimit ? 
                        <p className='text-red-500'>Full</p> :  
                        (
                            activity.isUnLimit ?  <p>Available</p> : <p>join {activity.quantity}/{activity.amount}</p>
                        )
                        
                    }

                    </div>
                </div>
                <div className='flex flex-col justify-between items-end'>
                    <button className='w-10 h-10 ' onClick={hdlDelete}> <DeleteIcon className="border rounded-full p-2 hover:bg-slate-100" /></button>
                </div>
            </div>
       
    )
}
