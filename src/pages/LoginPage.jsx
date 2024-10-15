import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const navigate = useNavigate()

  const [user , setUser] = useState('')
  const [password, setPassword] = useState('')

  function hdlRegister(e) {
    e.preventDefault()
    navigate("/register")
  }

  return (
    <div className='w-1/4 mx-auto mt-20 flex flex-col items-center px-12 pt-12 pb-8 border rounded-3xl'>
      <p className='text-4xl font-extrabold'>Login</p>
      <form className='flex flex-col w-full gap-4 mt-5'>
        <p className='text-lg font-bold'> username</p>
        <input placeholder='email' className="shadow border rounded w-full py-2 px-3 " onChange={(e) => setUser(e.target.value)}/>
        <p className='text-lg font-bold'> password</p>
        <input placeholder="password" className="shadow border rounded w-full py-2 px-3 " onChange={(e) => setPassword(e.target.value)}/>
        <button className='bg-[#00989d] p-3 rounded-3xl text-white font-semibold hover:bg-[#00898d]'>Login</button>
      </form>

      <button><p className='underline pt-2 text-[#00989d] hover:text-[#007276]'>Forgot password ?</p></button>
      <Separator className='my-3'/>

      <p className='text-[#bfb7b0]'>not have account? <button className='underline font-medium hover:text-[#98928c]' onClick={hdlRegister}>register</button></p>

    </div>
  )
}
