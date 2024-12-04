import { type ReactNode, memo } from 'react'
import company_logo from '@/assets/logo.png'

function Topbar(): ReactNode {
    return (
        <div className='w-screen h-[6rem] flex justify-center items-center'>
            <img src={company_logo} alt="logo" />
        </div>
    )
}

export default memo(Topbar)
