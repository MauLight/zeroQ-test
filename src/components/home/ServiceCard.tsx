import { type ReactNode } from 'react'
import { addUppercaseToFirstCharacter } from '@/utils/functions'
import { OfficesProps } from '@/utils/types'

interface ServiceCardProps {
    office: OfficesProps
    handleToggleOnline: (id: number) => void
}

function ServiceCard({ office, handleToggleOnline }: ServiceCardProps): ReactNode {

    const { id, name, elapsed, waiting, online } = office

    const headerStyle = online ? 'h-3/4 bg-zeroq-600 flex justify-start items-start py-7 px-5 text-[#ffffff]' : 'h-3/4 bg-[#e2e2e2] flex justify-start items-start py-7 px-5 text-gray-500'

    const footerStyle = online ? 'h-1/4 flex gap-x-8 bg-emerald-700 px-5' : 'h-1/4 flex gap-x-8 bg-gray-500 px-5'

    return (
        <section onClick={() => { handleToggleOnline(id) }} className="h-[12.5rem] col-span-1">
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
