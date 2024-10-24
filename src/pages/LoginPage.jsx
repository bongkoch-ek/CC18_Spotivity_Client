import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator"
import useUserStore from '../stores/userStore';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const navigate = useNavigate()

  const login = useUserStore(state => state.login)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [checkUsername, setCheckUsername] = useState(false)
  const [checkPassword, setCheckPassword] = useState(false)

  function hdlRegister(e) {
    e.preventDefault()
    navigate("/register")
  }

  function validate() {
    !user ? setCheckUsername(true) : setCheckUsername(false)
    !password ? setCheckPassword(true) : setCheckPassword(false)
  }


  async function hdlLogin(e) {
    try {
      e.preventDefault()

      validate()
      if(checkUsername || checkPassword)
        return

      let data = await login({ username: user, password })
      console.log(data)

      toast.success("Login success")

    } catch (error) {
      const errMsg = error.response?.data.message || error.message
      console.log(error.response)
      toast.error(errMsg)
    }
  }

  return (
    <div className='w-1/4 mx-auto mt-20 flex flex-col items-center px-12 pt-12 pb-8 border rounded-3xl bg-white'>
      <p className='text-4xl font-extrabold'>Login</p>
      <form className='flex flex-col w-full gap-4 mt-5' onSubmit={hdlLogin}>
        <p className='text-lg font-bold'> username</p>
        <input placeholder='username' className="shadow border rounded w-full py-2 px-3 " onChange={(e) => {setUser(e.target.value); setCheckUsername(false)}} />
        {
          checkUsername && <p className="mt-[-8px] text-xs text-red-600 " > username is require </p>
        }

        <p className='text-lg font-bold'> password</p>
        <input type='password' placeholder="password" className="shadow border rounded w-full py-2 px-3 " onChange={(e) => {setPassword(e.target.value); setCheckPassword(false)}} />
        {
          checkPassword && <p className="mt-[-8px] text-xs text-red-600 " > password is require </p>
        }

        <button className='bg-[#00989d] p-3 rounded-3xl text-white font-semibold hover:bg-[#00898d]'>Login</button>
      </form>

      <button><p className='underline pt-2 text-[#00989d] hover:text-[#007276]'>Forgot password ?</p></button>
      <Separator className='my-3' />

      <p className='text-[#bfb7b0]'>not have account? <button className='underline font-medium hover:text-[#98928c]' onClick={hdlRegister}>register</button></p>

    </div>
  )
}
