import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function registerPage() {

  const [firstName , setFirstName] = useState('')
  const [lastName , setLastName] = useState('')
  const [email , setEmail] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className='w-1/3 min-w-[500px] mx-auto mt-20 flex flex-col items-center px-12 pt-12 pb-8 border rounded-3xl'>
      <p className='text-4xl font-extrabold'>Register</p>
      <form className='flex flex-col w-full gap-2 mt-5'>
        <p className='text-lg font-medium'> first name* </p>
          <input placeholder='first name' className="shadow border rounded w-full py-2 px-3 " onChange={(e) => setFirstName(e.target.value)}/>
        <p className='text-lg font-medium'> last name*</p>
          <input placeholder='last name' className="shadow border rounded w-full py-2 px-3 " onChange={(e) => setLastName(e.target.value)} />
        <p className='text-lg font-medium'> email*</p>
          <input placeholder='email' className="shadow border rounded w-full py-2 px-3 " onChange={(e) => setEmail(e.target.value)} />
        <p className='text-lg font-medium'> username*</p>
          <input placeholder='username' className="shadow border rounded w-full py-2 px-3 " onChange={(e) => setUser(e.target.value)} />
        <p className='text-lg font-medium'> password*</p>
          <input placeholder='password' className="shadow border rounded w-full py-2 px-3 " onChange={(e) => setPassword(e.target.value)} />
        <p className='text-lg font-medium'> confirm password*</p>
          <input placeholder='confirm password' className="shadow border rounded w-full py-2 px-3 "  onChange={(e) => setConfirmPassword(e.target.value)}/>
       
          <button className='bg-[#00989d] p-3 rounded-3xl text-white font-semibold hover:bg-[#00898d] mt-5'>Register</button>
        <Link to='/login' className='underline text-center'>cancel</Link> 
      </form>

    </div>
  )
}
