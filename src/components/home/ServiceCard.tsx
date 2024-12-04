import { type ReactNode } from 'react'
import { addUppercaseToFirstCharacter } from '@/utils/functions'

interface ServiceCardProps {
    name: string
    waiting: number
    online: boolean
    elapsed: number
}

function ServiceCard({ name, waiting, elapsed, online }: ServiceCardProps): ReactNode {

    const headerStyle = online ? 'h-3/4 bg-zeroq-600 flex justify-center items-center px-5 text-[#ffffff]' : 'h-3/4 bg-[#e2e2e2] flex justify-center items-center px-5 text-[#8b8b8b]'

    const footerStyle = online ? 'h-1/4 flex gap-x-8 bg-zeroq-green px-5' : 'h-1/4 flex gap-x-8 bg-[#8b8b8b] px-5'

    return (
        <section className="h-[12.5rem] col-span-1">
            <header className={headerStyle}>
                <h2 className='text-[2rem] leading-tight'>
                    {addUppercaseToFirstCharacter(name)}
                </h2>
            </header>
            <footer className={footerStyle}>
                <div className="h-full flex items-center gap-x-2 text-[#ffffff]">
                    <i className="fa-regular fa-user fa-lg"></i>
                    <p className='text-[1rem]'>{waiting}</p>
                </div>
                <div className="h-full flex items-center gap-x-2 text-[#ffffff]">
                    <i className="fa-regular fa-clock fa-lg"></i>
                    <p className='text-[1rem]'>{elapsed}</p>
                </div>
            </footer>
        </section>
    )
}

export default ServiceCard
