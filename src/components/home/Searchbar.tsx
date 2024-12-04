import { Dispatch, type ReactNode, SetStateAction, memo } from 'react'

interface SearchbarProps {
    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>
}

function Searchbar({ searchTerm, setSearchTerm }: SearchbarProps): ReactNode {
    return (
        <section className="w-full flex justify-center items-start bg-zeroq-600">
            <div className="w-limit h-[3rem] flex items-center">
                <div className="relative h-full py-2">
                    <i className="absolute top-[17px] left-2 fa-solid fa-magnifying-glass text-gray-400"></i>
                    <input value={searchTerm} onChange={({ target }) => { setSearchTerm(target.value) }} type="text" placeholder='Buscar sucursal' className='rounded-[3px] h-full pl-8 pr-2' />
                </div>
            </div>
        </section>
    )
}

export default memo(Searchbar)