import { useState } from 'react'
import { Button } from '@/components/ui/button'
import AppRouter from './routers/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AppRouter/>
    </>
  )
}

export default App
