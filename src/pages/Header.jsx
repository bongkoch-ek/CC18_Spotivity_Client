import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../stores/userStore'
import { useShallow } from 'zustand/shallow'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import myImage from '../images/logo.png';

export default function Header() {

  const { user, logout } = useUserStore(useShallow(state => ({ user: state.user, logout: state.logout })))
  const [position, setPosition] = React.useState("bottom")
  const navigate = useNavigate();

  function hdlLogout(e) {
		e.preventDefault()
		logout()
	}

  function hdlAccount(e) {
		e.preventDefault()
    navigate("history");
	}

  return (
    <div className='relative'>

    
    <div className='fixed w-full bg-[#f7f7f7] z-50 flex justify-between items-center py-3 px-12 border-b-2'>
      <div className=''>
        <img src={myImage} className='w-36'/>
      </div>
      <nav className='flex gap-5'>
        <Link to='/'> <p className='rounded-3xl px-3 py-2 hover:bg-[#b0dfe1] hover:text-white  focus:ring-2'>HOME</p></Link>
        <Link to='/activity'><p className='rounded-3xl px-3 py-2 hover:bg-[#b0dfe1] hover:text-white'>ACTIVITY</p></Link>
        <Link><p className='rounded-3xl px-3 py-2 hover:bg-[#b0dfe1] hover:text-white'>ABOUT</p></Link>
      </nav>
      {
        user ?
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex gap-2'>
                <Avatar>
                  <AvatarImage src="https://www.svgrepo.com/show/420315/avatar-cloud-crying.svg" />
                  <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
                <button variant="outline" className='bg-transparent border-transparent text-black shadow-none hover:bg-transparent ' > {user.username}</button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuGroup value={position} onValueChange={setPosition}>
                <DropdownMenuItem value="my profile"><a onClick={hdlAccount}>My profile</a></DropdownMenuItem>
                <DropdownMenuItem value="history"><a onClick={hdlAccount}>History</a></DropdownMenuItem>
                <DropdownMenuItem value="logout" ><a onClick={hdlLogout}>Logout</a></DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          :
          <div className='flex gap-5'>
            <Link to='/register'>REGISTER</Link>
            <Link to='/login'>LOGIN</Link>

          </div>

      }

    </div>
    </div>
  )
}
