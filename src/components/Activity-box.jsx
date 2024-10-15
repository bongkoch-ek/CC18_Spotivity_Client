import React from 'react'
import { BookmarkDark, BookmarkLight } from '../icons'
import { useNavigate } from "react-router-dom";

export default function Activity_box(props) {

    const { datetime, title, interest, username, description, joinPeople, isBookmark, isJoined } = props

    const navigate = useNavigate();
    const data = { title };
    let test = new Date().toLocaleDateString();

    function hdlDetailClick() {
        navigate("/detail", { state: data });
    }

    return (
        <button className='border rounded-3xl p-8 flex flex-row shadow-md gap-9 w-full h-72 mb-5  hover:bg-[#f7f6f66e] hover:-translate-y-1' onClick={hdlDetailClick}>

            <div className='w-1/4 h-full'>
                <img className='rounded-3xl object-cover h-full w-full'
                    src="https://picsum.photos/500"
                    alt="Image" />
            </div>
            <div className='flex flex-col gap-2 w-3/4 justify-start items-start '>
                <p className='text-[#726E69]'> { test}</p>
                <div className='flex gap-6 items-baseline'>
                    <p className='font-bold text-3xl'>{title}</p>
                    <p className='text-[#726E69]'> 8 interest</p>
                </div>

                <p className='text-[#726E69]'>username</p>
                <p className='font-medium text-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, pariatur laudantium reprehenderit provident perferendis voluptatem eligendi? Tempora, nobis? Facere doloremque quos provident nulla necessitatibus distinctio expedita minima veritatis quibusdam ducimus.</p>

                <div className='flex flex-row justify-between mt-5 w-full'>
                    <p>join 5/5</p>
                    <div className='flex gap-5'>
                        <button className='w-10 h-10'> <BookmarkLight className="border rounded-full p-2 " /></button>
                        <button className=' bg-[#00898d] text-white text-center py-2 px-7 rounded-3xl'>join</button>
                    </div>
                </div>
            </div>
        </button>
    )
}
