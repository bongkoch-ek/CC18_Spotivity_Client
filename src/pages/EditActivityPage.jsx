import { Checkbox } from '@/components/ui/checkbox'
import React, { useEffect, useState } from 'react'
import CalendarPicker from '../components/CalendarPicker'
import { useLocation, useNavigate } from 'react-router-dom';
import useActivityStore from '../stores/activityStore';
import useUserStore from '../stores/userStore';
import GoogleMap from '../components/GoogleMap';
import { toast } from 'react-toastify';
import LoadingPage from './LoadingPage';

export default function EditActivity() {

    const location = useLocation();
    const activity = location.state;

    const getActivityType = useActivityStore(state => state.getActivityType)
    const activityType = useActivityStore(state => state.type)
    const user = useUserStore(state => state.user)
    const token = useUserStore(state => state.token)
    const editActivity = useActivityStore(state => state.editActivity)
    const loading = useActivityStore(state => state.loading)

    const [title, setTitle] = useState(activity.title)
    const [type, setType] = useState(+activity.type)
    const [otherType, setOther] = useState(activity.otherType)
    const [description, setDescription] = useState(JSON.parse(activity.description))
    const [amount, setAmount] = useState(activity.amount)
    const [isUnLimit, setIsUnLimit] = useState(!!activity.isUnLimit)
    const [imgPath, setImgPath] = useState(null)
    const [date, setDate] = useState(new Date(activity.startDate))
    const [startTime, setStartTime] = useState(new Date(activity.startDate).toTimeString().slice(0, 5))
    const [endTime, setEndTime] = useState(new Date(activity.endDate).toTimeString().slice(0, 5))
    const [mapName, setMapName] = useState(activity.mapName)
    const [latitude, setLatitude] = useState(activity.latitude)
    const [longitude, setLongitude] = useState(activity.longitude)

    const navigate = useNavigate();

    useEffect(() => { getActivityType() }, [])
    let stDate = date.toDateString() + " " + startTime + " GMT+7"
    let edDate = date.toDateString() + " " + endTime + " GMT+7"

    async function hdlSubmit(e) {
        try {
            //validate first
            if (!title || !description || !mapName) {
                return
            }
            console.log(activity)

            const data = {
                id: activity.id, title, type: +type, description, amount: +amount, isUnLimit, mapName, latitude, longitude, startDate: stDate, endDate: edDate
            }
            e.preventDefault()
            const body = new FormData()
            body.append('data', JSON.stringify(data))
            if (imgPath)
                body.append('image', imgPath)

            // console.log(data)
            await editActivity(body, token)
            toast.success("update success")
            navigate("/history/hosting")
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            console.log(errMsg)
            toast.error(errMsg)
        }
    }

    function hdlReset() {
        navigate("/history/hosting")
    }

    return (
        <div className='w-full pt-10 px-64 mb-5'>
            {
                loading && <LoadingPage />
            }
            <div className='flex flex-col gap-6'>
                <p className='font-bold text-4xl'>Edit your activity</p>

                <form className='w-full' onSubmit={hdlSubmit} onReset={hdlReset}>
                    {/* title */}
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="title">Title</label>
                        <input className="shadow border rounded w-full py-2 px-3 " type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {
                            !title && <p className="mt-1 text-sm text-red-600 " > title is require </p>
                        }
                    </div>

                    {/* type */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">type</label>
                        <select defaultValue={activity.typeId} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 " onChange={(e) => { setType(e.target.value) }}>
                            {
                                activityType.map(el => (
                                    <option key={el.id} value={el.id} id={el.id} className='text-black'>{el.nameEng}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* desc */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description" >description</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 " placeholder='type here' value={description} onChange={(e) => setDescription(e.target.value)} rows={description.split('\n').length + 1} />
                        {
                            !description && <p className="mt-1 text-sm text-red-600 " > description is require </p>
                        }
                    </div>

                    {/* amount */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">Amount</label>
                        {
                            !isUnLimit ?
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                                    type="number"
                                    placeholder="amount"
                                    value={amount} onChange={(e) => setAmount(e.target.value)}
                                />
                                : <input disabled className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-slate-200 cursor-not-allowed" type="text" placeholder="unlimit" value={0} />

                        }
                        <div className="mt-2">
                            <Checkbox className='mr-2' checked={isUnLimit} onCheckedChange={setIsUnLimit} />
                            <label className="text-gray-700">Unlimited</label>
                        </div>
                        
                    </div>

                    <div className="mb-4">
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700  hover:file:bg-violet-100"
                                onChange={e => setImgPath(e.target.files[0])} />
                        </label>
                        <div className='h-2/5 w-2/5 mb-2'>
                            {
                                imgPath ? <img src={URL.createObjectURL(imgPath)} alt="" /> : <img src={activity.imgUrl} />
                            }
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date and Time</label>
                        <div className="flex items-center">
                            <CalendarPicker date={date} setDate={setDate} />
                            <div className="ml-4 flex items-baseline">
                                <input className=" shadow-sm border rounded-md py-2 px-3 text-gray-700 h-10" id="time" type="time" onChange={(e) => { setStartTime(e.target.value) }} value={startTime} />
                                <p className='px-5'>to</p>
                                <input className=" shadow-sm border rounded-md py-2 px-3 text-gray-700 h-10" id="time" type="time" onChange={(e) => { setEndTime(e.target.value) }} value={endTime} />
                            </div>
                        </div>
                    </div>

                    {/* mapName */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >Place
                        </label>
                        <div className='mb-3'>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 " type="text" placeholder="location name" value={mapName} onChange={(e) => setMapName(e.target.value)} />
                        </div>
                        <div className="flex items-center h-[500px] w-[800px]">
                            <GoogleMap lat={latitude} lng={longitude} isFromCreate={true} setLatitude={setLatitude} setLongitude={setLongitude} />
                        </div>
                    </div>


                    <div className="flex space-x-4">
                        <button type='submit' className="bg-[#00989D] text-white py-2 px-6 rounded-3xl">save</button>
                        <button type='reset' className="bg-gray-200  py-2 px-6 rounded-3xl">cancel</button>
                    </div>
                </form>
            </div>



        </div >
    )


}
