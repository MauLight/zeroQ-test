import { lazy, Suspense, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import useFetchSort from './hooks/useFetchSort'

//* Components
import Topbar from './components/topbar/Topbar'
import Searchbar from '@/components/home/Searchbar'
import ErrorBoundary from './components/error/ErrorBoundary'
import HomeSkeleton from './components/home/HomeSkeleton'

//* Lazy components
const Home = lazy(async () => await import('@/views/Home'))

//* Types
import { OfficesProps } from './utils/types'


function App() {
  const { offices, status, error } = useFetchSort()
  //* Search state
  const [initialData, setInitialData] = useState<any[]>(() => offices)
  const [searchTerm, setSearchTerm] = useState<string>('')

  function searchData() {
    if (searchTerm.length > 0) {
      setInitialData(initialData.filter(elem => elem.name.toLowerCase().includes(searchTerm.toLowerCase())))
    } else {
      setInitialData(offices)
    }
  }

  useEffect(() => {
    if (offices.length > 0) {
      searchData()
    }
  }, [offices, searchTerm])

  return (
    <div className='min-h-screen bg-zeroq-800'>
      <Topbar />
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {
        status === 'success' && (
          <ErrorBoundary>
            <Suspense fallback={<HomeSkeleton />} >
              <Home offices={initialData as OfficesProps[]} />
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
    </div>
  )
}

export default App
