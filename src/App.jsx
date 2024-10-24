import { useState } from 'react'
import { Button } from '@/components/ui/button'
import AppRouter from './routers/AppRouter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

function App() {
  const googleKey = globalThis.REACT_APP_GOOGLE_MAP_KEY
  return (
    <>
      <APIProvider apiKey={"AIzaSyDUAh9fZ3Cx2lcC1UKSxRHc0xQ23L_HhkU"}>
        <AppRouter />
        <ToastContainer />
      </APIProvider>
    </>
  )
}

export default App
