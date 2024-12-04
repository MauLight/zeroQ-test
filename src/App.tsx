import { lazy, Suspense, useEffect, useState } from 'react'
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
  const { offices, status, error } = useFetchSort()

  //* Search state
  const [initialData, setInitialData] = useState<any[]>(() => offices)
  const [searchTerm, setSearchTerm] = useState<string>('')

  //* search the initial fetched data set on searchTerm change, or revert to initial fetched data set.
  function searchData() {
    if (searchTerm.length > 0) {
      setInitialData(initialData.filter(elem => elem.name.toLowerCase().includes(searchTerm.toLowerCase())))
    } else {
      setInitialData(offices)
    }
  }

  function handleToggleOnline(id: number) {
    const toggledMap = initialData.map((office) => office.id === id ? { ...office, online: !office.online } : office).sort((a: { online: boolean }, b: { online: boolean }) => Number(b.online) - Number(a.online))
    setInitialData(toggledMap)
  }

  //* Trigger searchData on office change (initial fetch) or on searchTerm change.
  useEffect(() => {
    if (offices.length > 0) {
      searchData()
    }
  }, [offices, searchTerm])

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
                    initialData.map((office) => (
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
