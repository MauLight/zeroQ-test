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
    const [status, setStatus] = useState<'idle' | 'pending' | 'rejected' | 'success'>('idle')
    const [error, setError] = useState<string>('')

    async function getOffices() {
        console.log('Starting the fetch!')
        try {
            setStatus('pending')
            const { data } = await axios.get(backendUrl)

            //* Immutable data sort to retain original data state. 
            const sortedData: OfficesProps[] = [...data].sort((a: { online: boolean }, b: { online: boolean }) => Number(b.online) - Number(a.online))

            //console.log(sortedData)
            const mapSortedData = sortedData.map((data) => {
                let waiting = 0
                data.lines.forEach((line) => waiting += line.waiting)
                return { ...data, waiting }
            })

            console.log(mapSortedData)

            setOffices(mapSortedData)
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
        const fetchInterval = setInterval(getOffices, 60000)
        return () => clearInterval(fetchInterval)
    }, [])

    return [offices, status, error]
}

export default useFetchSort