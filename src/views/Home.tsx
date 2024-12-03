import Searchbar from '@/components/home/Searchbar'
import ServiceCard from '@/components/home/ServiceCard'
import { type ReactNode } from 'react'

function Home(): ReactNode {
    return (
        <div className='w-screen h-screen flex flex-col gap-y-5'>
            <Searchbar />
            <div className="w-full flex justify-center items-start">
                <div className="w-limit  grid-cols-1 grid sm:grid-cols-2 min-[930px]:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-5">
                    <ServiceCard title='servipag ejercito libertador' users={40} time='2:10' />
                    <ServiceCard title='servipag ejercito libertador' users={40} time='2:10' />
                    <ServiceCard title='servipag ejercito libertador' users={40} time='2:10' />
                    <ServiceCard title='servipag ejercito libertador' users={40} time='2:10' />
                </div>
            </div>
        </div>
    )
}

export default Home