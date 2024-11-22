import { useState } from 'react'
import { Button } from '@/components/ui/button'
import AppRouter from './routers/AppRouter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
// import REACT_APP_GOOGLE_MAP_KEY = 

function App() {
  const googleKey = import.meta.env.VITE_GOOGLE_MAP_KEY
  return (
    <>
      <APIProvider apiKey={googleKey}>
        <AppRouter />
        <ToastContainer />
      </APIProvider>
    </>
  )
}

export default App
