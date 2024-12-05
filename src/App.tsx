import { lazy, Suspense } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import useFetchSort from './hooks/useFetchSort'

//* Components
import Topbar from './components/topbar/Topbar'
import Searchbar from '@/components/home/Searchbar'
import ErrorBoundary from './components/error/ErrorBoundary'
import HomeSkeleton from './components/home/HomeSkeleton'
import ServiceCard from './components/home/ServiceCard'

//* Lazy components
const Home = lazy(async () => await import('@/views/Home'))

function App() {
  const { offices, status, error, searchTerm, setSearchTerm, handleToggleOnline } = useFetchSort()

  return (
    <main className='min-h-screen bg-zeroq-800'>
      <Topbar />
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {
        status === 'success' && (
          <ErrorBoundary>
            <Suspense fallback={<HomeSkeleton />} >
              <Home>
                <>
                  {
                    offices.map((office) => (
                      <ServiceCard
                        key={office.id}
                        office={office}
                        handleToggleOnline={handleToggleOnline}
                      />
                    ))
                  }
                </>
              </Home>
            </Suspense>
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
    </main>
  )
}

export default App
