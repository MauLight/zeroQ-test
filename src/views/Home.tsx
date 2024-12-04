import { type ReactNode } from 'react'

//* Components
import ServiceCard from '@/components/home/ServiceCard'

//* Types
import { OfficesProps } from '@/utils/types'

interface HomeProps {
    offices: OfficesProps[]
}

function Home({ offices }: HomeProps): ReactNode {
    return (
        <div className='w-screen h-screen flex flex-col py-5'>
            <div className="w-full flex justify-center items-start">
                <div className="w-limit  grid-cols-1 grid sm:grid-cols-2 min-[930px]:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-5">
                    {
                        offices.map((office: OfficesProps) => (
                            <ServiceCard
                                key={office.id}
                                name={office.name}
                                waiting={office.waiting}
                                elapsed={office.elapsed}
                                online={office.online}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home