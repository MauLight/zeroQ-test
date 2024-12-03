
import { lazy } from 'react'
import Topbar from './components/topbar/Topbar'

const Home = lazy(async () => await import('@/views/Home'))

function App() {

  return (
    <div className='min-h-screen bg-zeroq-800'>
      <Topbar />
      <Home />
    </div>
  )
}

export default App
