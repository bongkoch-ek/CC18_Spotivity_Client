import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='flex justify-between p-5 px-10 border-b-2'>
        <div>
            <img src="" alt="" />
            <p>LOGO</p>
        </div>
        <nav className='flex gap-5'>
            <Link to='/'>HOME</Link>
            <Link to='/activity'>EVENT</Link>
            <Link>ABOUT</Link>
        </nav>

        <div className='flex gap-5'>
            <img src="" alt="" />
            <Link to='/register'>REGISTER</Link>
            <Link to='/login'>LOGIN</Link>

        </div>
    </div>
  )
}
