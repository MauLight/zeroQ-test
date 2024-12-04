import { type ReactNode, memo } from 'react'

function Searchbar(): ReactNode {
    return (
        <div className="w-full flex justify-center items-start bg-zeroq-600">
            <div className="w-limit h-[3rem] flex items-center">
                <div className="relative h-full py-2">
                    <i className="absolute top-[17px] left-2 fa-solid fa-magnifying-glass text-gray-400"></i>
                    <input type="text" placeholder='Buscar sucursal' className='rounded-[3px] h-full pl-8 pr-2' />
                </div>
            </div>
        </div>
    )
}

export default memo(Searchbar)