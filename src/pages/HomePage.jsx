import React from 'react'
import myImage from '../images/home.jpg';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/userStore';

export default function homePage() {

  const divStyle = {
    width: '100vw',
    height: '850px',
    backgroundImage: `url(${myImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(0.8)',
    opacity : 0.7
  };

  const navigate = useNavigate();
  const user = useUserStore(state => state.user)

  function hdlCreate() {
    if (!user) {
      navigate("/login")
    }
    else {
      navigate('/create-activity')
    }
  }
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full '>

        <div className=' flex flex-col gap-20 items-center' style={divStyle}>
          <p className='text-white w-[1000px] text-7xl font-extrabold mx-auto pt-48 uppercase tracking-wide '>Great things happen when passionate people come together.</p>
          <button className='rounded-full bg-[#00989d] py-4 px-7 font-semibold text-2xl text-white hover:bg-[#00898d]' onClick={hdlCreate}>start create activity</button>
        </div>

        <div>
          
        </div>

      </div>
    </div>
  )
}
