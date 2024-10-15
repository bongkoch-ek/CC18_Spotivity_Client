import React from 'react'
import { SearchIcon } from '../icons'

export default function MapCard() {
    return (
        <div className="w-full bg-base-100 shadow-md">
            <div className="">
                <div className='flex items-center gap-2 px-5 pt-5'>
                    <SearchIcon className='w-4 h-4' />
                    <p>Sat, 12 Oct 2024</p>
                </div>
                <div className='flex items-center gap-2 px-5 pt-1 pb-3'>
                    <SearchIcon className='w-4 h-4' />
                    <p>place goto hell</p>
                </div>
            </div>
            <div className='bg-slate-400 h-96'>map</div>
        </div>
    )
}
