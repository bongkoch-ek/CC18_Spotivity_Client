import { Checkbox } from '@/components/ui/checkbox'
import React, { useState } from 'react'
import CalendarPicker from '../components/CalendarPicker'

export default function CreateActivity() {
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0)
    const [isUnLimit, setIsUnLimit] = useState(false)
    const [imgPath, setImgPath] = useState(null)
    const [date, setDate] = useState(new Date())
    let hour = new Date().getHours()
    hour = hour + 1
    if(hour.length == 1){
        hour = '0' + hour
    }
    let end = new Date().getHours()
    end = end + 2
    if(hour.length == 1){
        hour = '0' + hour
    } 
    let minute = new Date().getMinutes()
    if(minute.length == 1){
        minute = '0' + minute
    }
    const [startTime, setStartTime] = useState(`${hour}:${minute}`)
    const [endTime, setEndTime] = useState(`${end}:${minute}`)


    return (
        <div className='w-full flex justify-center pt-10 px-64 '>
            <div className='flex flex-col w-3/5 gap-6'>
                <p className='font-bold text-4xl'>Create an activity</p>

                <form className='w-full'>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="title">Title</label>
                        <input className="shadow border rounded w-full py-2 px-3 " type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">type</label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 " id="type">
                            <option>Select type</option>
                            <option>Select type</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description" >description</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 " placeholder='type here' onChange={(e) => setDescription(e.target.value)} rows={description.split('\n').length + 1}/>
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">Amount</label>
                        {
                            !isUnLimit ?
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 " type="text" placeholder="amount" onChange={(e) => setAmount(e.target.value)}/>
                       :     <input disabled className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-slate-200 cursor-not-allowed" type="text" placeholder="amount" />

                        }
                        <div className="mt-2">
                            <Checkbox className='mr-2' checked={isUnLimit} onCheckedChange={setIsUnLimit}/>
                            <label htmlFor="unlimited" className="text-gray-700">Unlimited</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700  hover:file:bg-violet-100" 
                                   onChange={e => setImgPath(e.target.files[0])} />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date and Time</label>
                        <div className="flex items-center">
                            <CalendarPicker date={date} setDate={setDate} />
                            <div className="ml-4 flex items-baseline">
                                <input className=" shadow-sm border rounded-md py-2 px-3 text-gray-700 h-10" id="time" type="time" onChange={(e) => { setStartTime(e.target.value) }}  value={startTime}/>
                                <p className='px-5'>to</p>
                                <input className=" shadow-sm border rounded-md py-2 px-3 text-gray-700 h-10" id="time" type="time" onChange={(e) => { setEndTime(e.target.value) }} value={endTime}/>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button className="bg-[#00989D] text-white py-2 px-6 rounded-3xl">save</button>
                        <button className="bg-gray-200  py-2 px-6 rounded-3xl">cancel</button>
                    </div>
                </form>
            </div>



        </div >
    )


}
