import React, { useEffect, useState } from 'react'
import Activity_box from '../components/Activity-box'
import Dropdown from '../components/Dropdown'
import { SearchIcon } from '../icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useActivityStore from '../stores/activityStore'
import LoadingPage from './LoadingPage'

export default function ActivityPage() {

  const activity = useActivityStore(state => state.activity)
  const getAllActivity = useActivityStore(state => state.getAllActivity)
  const searchActivity = useActivityStore(state => state.search)
  const loading = useActivityStore(state => state.loading)
  const activityType = useActivityStore(state => state.type)
  const getActivityType = useActivityStore(state => state.getActivityType)
  const typeSearch = useActivityStore(state => state.typeSearch)

  const [search, setSearch] = useState('')
  const [type, setType] = useState(0)

  useEffect(() => { getAllActivity() }, [])
  useEffect(() => { getActivityType() }, [])

  async function hdlSearch(text) {
    await searchActivity(text)
  }

  async function hdlReset() {
    setType(0)
    await getAllActivity()
  }

  async function typeChange(e) {
    setType(e.target.value)
    console.log(e.target.value)
    await typeSearch(e.target.value)
  }
  

  return (
    <div className='flex flex-col w-full justify-center items-center pt-5 mb-5'>


      <div className=" flex items-center gap-2 w-full justify-center mb-5">
        <input type="text" placeholder={`search here`} className=' w-3/5 border py-2 px-5 rounded-3xl' onChange={(e) => hdlSearch(e.target.value)} />
      </div>

      {/* dropdown */}
      <div className='w-full flex justify-center items-center text-center gap-5'>
        <select value={type} onChange={(e) => typeChange(e)} className={`shadow appearance-none border rounded w-1/5 py-2 px-3 mb-4 text-gray-700  `}>
          <option value={0} disabled >Select Activity type</option>
          {
            activityType.map(el => (
              <option key={el.id} value={el.id} id={el.id} className='text-black'>{el.nameEng}</option>
            ))
          }
        </select>
        <button className='hover:underline' onClick={hdlReset}>reset filter</button>
      </div>
     
      <div className='w-4/5 h-full flex flex-col justify-center items-center'>
        {
          activity.length !== 0 ?
            activity.map(el => (<div className='w-full' key={el.id}>
              <Activity_box key={el.id} activity={el} />
            </div>
            ))
            :
            <p>ยังไม่มีรายการขณะนี้</p>
        }
        {/* <button className='btn px-10 mb-5 rounded-3xl border-[#00898d] bg-white text-[#00898d]'>load more</button> */}
      </div>


    </div>


  )
}
