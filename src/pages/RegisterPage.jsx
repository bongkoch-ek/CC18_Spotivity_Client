import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../stores/userStore'
import Modal from '../components/AlertDialog'

export default function registerPage() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const register = useUserStore(state => state.register)

  const [checkFirstName, setCheckFirstName] = useState(false)
  const [checkLastName, setCheckLastName] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)
  const [checkUsername, setCheckUsername] = useState(false)
  const [checkPassword, setCheckPassword] = useState(false)
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false)
  const [checkMatch, setCheckMatch] = useState(false)

  const [regis, setRegis] = useState(false)



  function resetData() {
    setFirstName('')
    setLastName('')
    setEmail('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  function validate() {
    !firstName ? setCheckFirstName(true) : setCheckFirstName(false)
    !lastName ? setCheckLastName(true) : setCheckLastName(false)
    !email ? setCheckEmail(true) : setCheckEmail(false)
    !username ? setCheckUsername(true) : setCheckUsername(false)
    !password ? setCheckPassword(true) : setCheckPassword(false)
    !confirmPassword ? setCheckConfirmPassword(true) : setCheckConfirmPassword(false)

    if ((password && confirmPassword) && password != confirmPassword) {
      setCheckMatch(true)
    }
  }

  async function hdlSubmit(e) {
    try {
      e.preventDefault()

      validate()
      if (checkFirstName || checkLastName || checkEmail || checkUsername || checkPassword || checkConfirmPassword || checkMatch)
        return

      const data = { firstName, lastName, email, username, password, confirmPassword }
      console.log(999)
      let result = await register(data)
      console.log(result)

      resetData()
      setRegis(true)

    } catch (error) {
      const errMsg = error.response?.data.error || error.message
      console.log(errMsg)
    }
  }


  return (
    <div className='w-1/3 min-w-[500px] mx-auto flex flex-col items-center mt-6 px-12 pt-12 pb-8 border rounded-3xl bg-white'>
      <p className='text-4xl font-extrabold'>Register</p>
      <form className=' flex flex-col w-full gap-2 mt-5 ' onSubmit={hdlSubmit} noValidate>
        <p className='text-lg font-medium'> first name </p>
        <input placeholder='first name' value={firstName} className="shadow border rounded w-full py-2 px-3 " onChange={(e) => { setFirstName(e.target.value); setCheckFirstName(false) }} />
        {
          checkFirstName && <p className="mt-[-4px] text-xs text-red-600 " > name is require </p>
        }

        <p className='text-lg font-medium'> last name</p>
        <input placeholder='last name' value={lastName} className="shadow border rounded w-full py-2 px-3 " onChange={(e) => { setLastName(e.target.value); setCheckLastName(false) }} />
        {
          checkLastName && <p className="mt-[-4px] text-xs text-red-600 " >last name is require </p>
        }

        <label>
          <p className='text-lg font-medium'> email</p>
          <input id='email' placeholder='email' value={email} className="shadow border rounded w-full py-2 px-3  "
            onChange={(e) => { setEmail(e.target.value); setCheckEmail(false) }} />
          {
            checkEmail && <p className="mt-1 text-xs text-red-600 " > email is require </p>
          }
        </label>

        <p className='text-lg font-medium'> username</p>
        <input placeholder='username' value={username} className="shadow border rounded w-full py-2 px-3 " onChange={(e) => { setUsername(e.target.value); setCheckUsername(false) }} />
        {
          checkUsername && <p id='emailErr' className="mt-[-4px] text-xs text-red-600 " > username is require </p>
        }

        <p className='text-lg font-medium'> password</p>
        <input id='password' placeholder='password' value={password} type='password' className="shadow border rounded w-full py-2 px-3 " onChange={(e) => { setPassword(e.target.value); setCheckPassword(false) }} />
        <p id="passwordError" className="text-sm text-red-600 hidden">Password must be at least 6 characters long</p>
        {
          checkPassword && <p id='emailErr' className="mt-[-4px] text-xs text-red-600 " > password is require </p>
        }

        <p className='text-lg font-medium'> confirm password</p>
        <input placeholder='confirm password' value={confirmPassword} type='password' className="shadow border rounded w-full py-2 px-3 " onChange={(e) => { setConfirmPassword(e.target.value); setCheckConfirmPassword(false); setCheckMatch(false) }} />
        {
          checkConfirmPassword && <p className="mt-[-4px] text-xs text-red-600 " > confirm password is require </p>
        }
        {
          checkMatch && <p className="mt-[-4px] text-xs text-red-600 " > password and confirm password not math </p>
        }
        <button className='bg-[#00989d] p-3 rounded-3xl text-white font-semibold hover:bg-[#00898d] mt-5 '>register</button>

        {
          regis && <Modal from="REGISTER" txtTitle="Register success" isOpen={true} txtDetail="Register successful. Please log in again." />
        }

        <Link to='/login' className='underline text-center'>cancel</Link>
      </form>




    </div>
  )
}

