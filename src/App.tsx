
import { lazy, useLayoutEffect } from 'react'

//* Components
import Topbar from './components/topbar/Topbar'
import useFetchSort from './hooks/useFetchSort'
import ErrorBoundary from './components/error/ErrorBoundary'

const Home = lazy(async () => await import('@/views/Home'))

function App() {
  const [offices, status] = useFetchSort()

  useLayoutEffect(() => {
    console.log(offices)
  }, [status])

  return (
    <div className='min-h-screen bg-zeroq-800'>
      <Topbar />
      {
        status === 'success' && (
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        )
      }
    </div>
  )
}

export default App
