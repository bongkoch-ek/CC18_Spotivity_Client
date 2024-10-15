import React from 'react'
import { useLocation } from 'react-router-dom';
import { BookmarkLight, SearchIcon } from '../icons';
import { Badge } from "@/components/ui/badge"
import MapCard from '../components/MapCard';

export default function detailPage() {

  const location = useLocation();
  const data = location.state;

  console.log(data)
  return (
    <div className='w-full pt-10 px-44'>
      <div className='w-full mb-5'>
        <div className='flex justify-between '>
          <div className='flex flex-col gap-3'>
            <p className='font-bold text-4xl'>Sawatdee Title</p>
            <div className='flex gap-3 items-center'>
              <img src="https://picsum.photos/100" alt="user_profile" className='w-10 h-10 rounded-full' />
              <div>
                <p className=''>host by </p>
                <p className='font-medium'>username</p>
              </div>
            </div>
          </div>
          <div className='flex gap-6 items-center'>
            <button>
              <BookmarkLight className='w-12 h-12 border rounded-full p-2' />
            </button>
            <button className='bg-[#00898d] text-white text-center py-3 px-10 rounded-3xl font-semibold'>join</button>
          </div>
        </div>
      </div>


      <div className='flex gap-10 w-full justify-between'>

        <div className='flex flex-col gap-3 w-[70%]'>
          <img className='rounded-2xl w-3/5 max-h-[400px] object-cover' src="https://picsum.photos/800" alt="Image" />
          <p className='items-center text-center border rounded-3xl bg-[#b0cbcb] text-white font-medium w-14'>Type</p>
          <p className='font-semibold text-xl'>Description</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, error quam minus illum quibusdam alias possimus ducimus aliquid quo deleniti ipsum quisquam natus dolores voluptatem, reiciendis repellat. Minima, quam consequuntur.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus temporibus ipsam necessitatibus repellendus libero et. Doloribus ea, quas inventore fugit sint corporis officiis aperiam! A possimus corrupti debitis temporibus quae.
          </p>
        </div>

        {/* <div className=" bg-base-100 w-[30%] shadow-md">
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
          <div className='bg-slate-400 h-3/4'>map</div>
        </div> */}

        <div className='w-[30%]'>
          <MapCard />
        </div>


      </div>

    </div>
  )
}
