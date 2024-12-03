import axios from 'axios'
import { useLayoutEffect, useState } from 'react'

const backendUrl = import.meta.env.VITE_BACKENDURL

interface OfficesProps {
    id: number
    lines: Array<{ waiting: number, elapsed: number }>
    name: string
    online: boolean
}

function useFetchSort() {
    const [offices, setOffices] = useState<OfficesProps[]>([])
    const [status, setStatus] = useState<'idle' | 'loading' | 'rejected' | 'success'>('idle')
    const [error, setError] = useState<string>('')

    async function getOffices() {
        try {
            setStatus('loading')
            const { data } = await axios.get(backendUrl)
            setOffices(data)
            setStatus('success')
        } catch (error) {
            setStatus('rejected')
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || error.message)
            } else {
                setError('There was an error on our side.')
            }
            console.error(error)
        }
    }

    useLayoutEffect(() => {
        getOffices()
    }, [])

    return [offices, status, error]
}

export default useFetchSort