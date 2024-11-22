import { Checkbox } from '@/components/ui/checkbox'
import React, { useEffect, useState } from 'react'
import CalendarPicker from '../components/CalendarPicker'
import useActivityStore from '../stores/activityStore'
import useUserStore from '../stores/userStore'
import { useNavigate } from 'react-router-dom';
import GoogleMap from '../components/GoogleMap'
import { toast } from 'react-toastify'
import Modal from '../components/AlertDialog'
import LoadingPage from './LoadingPage'

export default function CreateActivity() {

    //#region prop
    const [title, setTitle] = useState('')
    const [type, setType] = useState(0)
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(null)
    const [isUnLimit, setIsUnLimit] = useState(false)
    const [imgPath, setImgPath] = useState(null)
    const [date, setDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)))
    const [mapName, setMapName] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [otherType, setOther] = useState('')

    //#region time
    let hour = new Date().getHours()
    if (hour.toString().length == 1) {
        hour = '0' + hour
    }
    let minute = new Date().getMinutes()
    if (minute.toString().length == 1) {
        minute = '0' + minute
    }
    //#endregion
    const [startTime, setStartTime] = useState(`${hour}:${minute}`)
    const [endTime, setEndTime] = useState(`${hour}:${minute}`)

    const getActivityType = useActivityStore(state => state.getActivityType)
    const activityType = useActivityStore(state => state.type)
    const createActivity = useActivityStore(state => state.createActivity)
    const loading = useActivityStore(state => state.loading)
    const user = useUserStore(state => state.user)
    const token = useUserStore(state => state.token)
    const navigate = useNavigate();

    useEffect(() => { getActivityType() }, [])
    let stDate = date.toDateString() + " " + startTime + " GMT+7"
    let edDate = date.toDateString() + " " + endTime + " GMT+7"
    //#endregion

    const [confirm, setConfirm] = useState(false)

    const data = {
        title, type: +type, description, amount: +amount, isUnLimit, mapName: mapName, latitude, longitude, startDate: stDate, endDate: edDate, otherType
    }

    //#region 
    const [checkTitle, setCheckTitle] = useState(false)
    const [checkType, setCheckType] = useState(false)
    const [checkDesc, setCheckDesc] = useState(false)
    const [checkAmount, setCheckAmount] = useState(false)
    const [checkMapName, setCheckMapName] = useState(false)
    const [checkImg, setCheckImg] = useState(false)
    const [checkOther, setCheckOther] = useState(false)
    //#endregion

    async function hdlSubmit(e) {
        try {
            e.preventDefault()

            //#region validate
            if (!title) {
                setCheckTitle(true)
                return
            }
            if (!type) {
                setCheckType(true)
                return
            }
            if (type == 99 && !otherType) {
                setCheckOther(true)
                return
            }
            if (!description) {
                setCheckDesc(true)
                return
            }
            if (!amount && !isUnLimit) {
                setCheckAmount(true)
                return
            }
            if (!imgPath) {
                setCheckImg(true)
                return
            }
            if (!mapName) {
                setCheckMapName(true)
                return
            }

            if (type != 99) {
                setOther('')
            }
            //#endregion

            const body = new FormData()
            body.append('data', JSON.stringify(data))
            body.append('image', imgPath)

            const result = await createActivity(body, token, user)
            // navigate("/activity")
            setConfirm(true)

        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            console.log(errMsg)
            toast.error(errMsg)

        }
    }

    function hdlReset() {
        navigate("/activity")
    }


    return (
        <div className='w-full flex justify-center pt-10 px-64 mb-5'>
            {
                loading && <LoadingPage />
            }
            <div className='flex flex-col w-3/5 gap-6'>
                <p className='font-bold text-4xl'>Create an activity</p>

                <form className='w-full' onSubmit={hdlSubmit} onReset={hdlReset}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" >Title</label>
                        <input className={`shadow border rounded w-full py-2 px-3  ${checkTitle && "ring-1 ring-red-600"}`} type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} onFocus={() => setCheckTitle(false)} />
                        {
                            checkTitle && <p className="mt-1 text-sm text-red-600 " > title is require </p>
                        }
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >type</label>
                        <select defaultValue={0} onChange={(e) => { setType(e.target.value) }} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${checkType && "ring-1 ring-red-600"}`} id="type" onFocus={() => { setCheckType(false) }}>
                            <option value={0} disabled >Select Activity type</option>
                            {
                                activityType.map(el => (
                                    <option key={el.id} value={el.id} id={el.id} className='text-black'>{el.nameEng}</option>
                                ))
                            }
                        </select>
                        {
                            type == 99 && <input className={`shadow border rounded w-full py-2 px-3 mt-2  ${checkOther && "ring-1 ring-red-600"}`} placeholder='Please specify' onChange={(e) => setOther(e.target.value)} />
                        }
                        {
                            checkType && <p className="mt-1 text-sm text-red-600 " > type is require </p>
                        }
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description" >description</label>
                        <textarea className={`shadow appearance-none border rounded w-full py-2 px-3 ${checkDesc && "ring-1 ring-red-600"}`} placeholder='type here' onChange={(e) => setDescription(e.target.value)} rows={description.split('\n').length + 2} onFocus={() => { setCheckDesc(false) }} />
                        {
                            checkDesc && <p className="mt-1 text-sm text-red-600 " > description is require </p>
                        }
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">Amount</label>
                        {
                            !isUnLimit ?
                                <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  ${checkAmount && "ring-1 ring-red-600"} `} type="number" placeholder="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    onFocus={() => { setCheckAmount(false) }} />
                                : <input disabled className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-slate-200 cursor-not-allowed"
                                    value={''} type="text" placeholder="unlimit" />

                        }
                        {
                            checkAmount && <p className="mt-1 text-sm text-red-600 " > amount is require </p>
                        }
                        <div className="mt-2">
                            <Checkbox className='mr-2' checked={isUnLimit} onCheckedChange={() => { setIsUnLimit(!isUnLimit); setCheckAmount(false) }} />
                            <label htmlFor="unlimited" className="text-gray-700">Unlimited</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"> Photo
                            <span className="sr-only">Choose photo</span>
                            <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#d9e6e6] file:text-[#005657]  hover:file:bg-violet-100"
                                onChange={e => setImgPath(e.target.files[0])} onFocus={() => setCheckImg(false)} />
                            {
                                imgPath && <img className='max-w-96 mt-2' src={URL.createObjectURL(imgPath)} alt="" />
                            }
                        </label>
                        {
                            checkImg && <p className="mt-1 text-sm text-red-600 " > image is require </p>
                        }
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >Date and Time</label>
                        <div className="flex items-center">
                            <CalendarPicker date={date} setDate={setDate} />
                            <div className="ml-4 flex items-baseline">
                                <input className=" shadow-sm border rounded-md py-2 px-3 text-gray-700 h-10" id="time" type="time" onChange={(e) => { setStartTime(e.target.value) }} value={startTime} />
                                <p className='px-5'>to</p>
                                <input className=" shadow-sm border rounded-md py-2 px-3 text-gray-700 h-10" id="time" type="time" onChange={(e) => { setEndTime(e.target.value) }} value={endTime} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >Place
                        </label>
                        <div className='mb-3'>
                            <p>Please enter the location name </p>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 " type="text" placeholder="location name" onChange={(e) => setMapName(e.target.value)} />
                        </div>
                        <p className='text-red-600 '>** Please pin the location on the map</p>
                        <div className="flex items-center h-[500px] w-[800px]">
                            <GoogleMap lat={13.7563} lng={100.5018} isFromCreate={true} latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />
                        </div>
                    </div>


                    <div className="flex space-x-4">
                        <button type='submit' className="bg-[#00989D] text-white py-2 px-6 rounded-3xl" onClick={hdlSubmit}>save</button>
                        <button type='reset' className="bg-gray-200  py-2 px-6 rounded-3xl">cancel</button>
                    </div>
                </form>
            </div>

            {
                confirm && <Modal from="CREATE" txtTitle="SUCCESS" isOpen={true}
                    txtDetail={`Create activity success. `} />
            }


        </div >
    )


}
