
import { lazy, useLayoutEffect } from 'react'
import axios from 'axios'

//* Components
import Topbar from './components/topbar/Topbar'

const backendUrl = import.meta.env.VITE_BACKENDURL
console.log(backendUrl)

const Home = lazy(async () => await import('@/views/Home'))

function App() {

  async function getAllServices() {
    try {
      const { data } = await axios.get(backendUrl)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  useLayoutEffect(() => {
    getAllServices()
  }, [])

  return (
    <div className='min-h-screen bg-zeroq-800'>
      <Topbar />
      <Home />
    </div>
  )
}

export default App
