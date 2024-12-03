import { type ReactNode } from 'react'
import { addUppercaseToFirstCharacter } from '@/utils/functions'

interface ServiceCardProps {
    title: string
    users: number
    time: string
}

function ServiceCard({ title, users, time }: ServiceCardProps): ReactNode {

    return (
        <section className="h-[12.5rem] col-span-1">
            <header className="h-3/4 bg-zeroq-600 flex justify-center items-center px-5">
                <h2 className='text-[#ffffff] text-[2rem] leading-tight'>
                    {addUppercaseToFirstCharacter(title)}
                </h2>
            </header>
            <footer className="h-1/4 flex gap-x-8 bg-zeroq-green px-5">
                <div className="h-full flex items-center gap-x-2 text-[#ffffff]">
                    <i className="fa-regular fa-user fa-lg"></i>
                    <p className='text-[1rem]'>{users}</p>
                </div>
                <div className="h-full flex items-center gap-x-2 text-[#ffffff]">
                    <i className="fa-regular fa-clock fa-lg"></i>
                    <p className='text-[1rem]'>{time}</p>
                </div>
            </footer>
        </section>
    )
}

export default ServiceCard
