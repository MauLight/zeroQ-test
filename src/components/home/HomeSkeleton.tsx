import { type ReactNode } from 'react'

function HomeSkeleton(): ReactNode {
    return (
        <div className='w-screen h-screen flex flex-col py-5'>
            <div className="w-full flex justify-center items-start">
                <div className="w-limit grid-cols-1 grid sm:grid-cols-2 min-[930px]:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-5">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="h-[12.5rem] col-span-1 bg-gray-200 animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeSkeleton