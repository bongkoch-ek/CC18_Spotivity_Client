import React from 'react'
import { DeleteIcon } from '../icons';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/userStore';
import useActivityStore from '../stores/activityStore';

export default function OwnBox(props) {

    const { activity } = props
    const navigate = useNavigate();

    const token = useUserStore(state => state.token)
    const deleteActivity = useActivityStore(state => state.deleteActivity)

    const description = (str) => {
        if (str.length > 200) {
            return str.slice(0, 200) + "..."
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
        await deleteActivity(token, activity.id)
    }

    function hdlEdit(e) {
        e.stopPropagation()
        navigate("/edit-activity", { state: activity })
    }
    console.log(activity)
    return (
        <div onClick={hdlDetailClick}>
            <div key={activity.id} className={`h-60 border rounded-3xl p-8 flex flex-row shadow-md gap-9 w-4/5 h-50 mb-5  ${activity.IsActive && "hover:bg-[#f7f6f66e] hover:-translate-y-1"}  ${!activity.IsActive && "bg-slate-200 text-gray-500"}`} >

                <div className='w-1/4 h-full'>
                    <img className={`rounded-3xl object-cover h-full w-full ${!activity.IsActive && "opacity-35"}`}
                        src={activity.imgUrl}
                        alt="Image" />
                </div>
                <div className='flex flex-col gap-2 w-3/4 justify-start items-start '>
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
                {
                    activity.IsActive &&
                    <div className='flex flex-col justify-between items-end'>

                        <button onClick={hdlEdit}
                            className={`border rounded-3xl px-5 py-2 border-[#00989d] text-[#00989d] font-semibold hover:bg-[#00989d] hover:text-white`}>edit</button>
                        <button className='w-10 h-10 ' onClick={hdlDelete}> <DeleteIcon className="border rounded-full p-2 hover:bg-slate-100" /></button>
                    </div>
                }

            </div>
        </div>
    )
}
