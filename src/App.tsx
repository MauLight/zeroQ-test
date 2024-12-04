import { lazy, useLayoutEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'

//* Components
import Topbar from './components/topbar/Topbar'
import useFetchSort from './hooks/useFetchSort'
import ErrorBoundary from './components/error/ErrorBoundary'
import { OfficesProps } from './utils/types'

const Home = lazy(async () => await import('@/views/Home'))

function App() {
  const [offices, status, error] = useFetchSort()

  useLayoutEffect(() => {
    console.log(offices)
  }, [status])

  return (
    <div className='min-h-screen bg-zeroq-800'>
      <Topbar />
      {
        status === 'success' && (
          <ErrorBoundary>
            <Home offices={offices as OfficesProps[]} />
          </ErrorBoundary>
        )
      }
      {
        status === 'pending' && (
          <div className='flex justify-center pt-44'>
            <RotatingLines width='60' strokeColor='#ffffff' />
          </div>
        )
      }
      {
        status === 'rejected' && (
          <div className='flex justify-center pt-44'>
            <h2 className='text-[2rem] bg-[#ffffff] px-2 rounded-[5px] text-red-600'>{String(error)}</h2>
          </div>
        )
      }
    </div>
  )
}

export default App
