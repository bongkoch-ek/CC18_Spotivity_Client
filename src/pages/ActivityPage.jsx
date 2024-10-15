import React, { useState } from 'react'
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

export default function ActivityPage() {

  const [search, setSearch] = useState('')

  return (
    <div className='flex flex-col w-full justify-center items-center pt-5'>

      <div className=" flex items-center gap-2 w-full justify-center">
        <input type="text" placeholder={`search here`} className=' w-3/5 border py-2 px-5 rounded-3xl' onChange={(e) => setSearch(e.target.value)}/>
      </div>

      {/* dropdown */}
      <div className='my-5 flex  gap-5 w-full items-center justify-center'>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sport Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Football</SelectItem>
            <SelectItem value="dark">Marge</SelectItem>
            <SelectItem value="system">Maggie</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Football</SelectItem>
            <SelectItem value="dark">Marge</SelectItem>
            <SelectItem value="system">Maggie</SelectItem>
          </SelectContent>
        </Select>

        <button>reset filter</button>
      </div>

      <div className='w-4/5 h-full flex flex-col justify-center items-center'>
        <Activity_box title="Test01" />
        <Activity_box title="Test02" />
        <Activity_box title="Test03" />
        <Activity_box title="Test04" />
        <Activity_box title="Test05" />
      </div>
      <button className='btn px-10 mb-5 rounded-3xl border-[#00898d] bg-white text-[#00898d]'>load more</button>
    </div>
  )
}
