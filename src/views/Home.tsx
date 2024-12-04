import { type ReactNode } from 'react'

interface HomeProps {
    children: ReactNode
}

function Home({ children }: HomeProps): ReactNode {
    return (
        <section className='w-screen h-screen flex flex-col py-5'>
            <div className="w-full flex justify-center items-start">
                <div className="w-limit  grid-cols-1 grid sm:grid-cols-2 min-[930px]:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-5">
                    {
                        children
                    }
                </div>
            </div>
        </section>
    )
}

export default Home