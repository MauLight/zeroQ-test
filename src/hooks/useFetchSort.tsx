import axios from 'axios'
import { useLayoutEffect, useState } from 'react'
import { formatSecondsToMinutes } from '@/utils/functions'
import { OfficesProps } from '@/utils/types'

const backendUrl = import.meta.env.VITE_BACKENDURL

function useFetchSort() {

    //* Fetch state
    const [offices, setOffices] = useState<OfficesProps[]>([])
    const [status, setStatus] = useState<'idle' | 'pending' | 'rejected' | 'success'>('idle')
    const [error, setError] = useState<string>('')

    async function getOffices() {
        try {
            setStatus('pending')
            const { data } = await axios.get(backendUrl)

            //* Immutable data sort to retain original data state.
            const sortedData: OfficesProps[] = [...data].sort((a: { online: boolean }, b: { online: boolean }) => Number(b.online) - Number(a.online))

            const mapSortedData = sortedData.map((data) => {
                let waiting = 0
                let elapsed = 0
                data.lines.forEach((line) => waiting += line.waiting)
                data.lines.forEach((line) => elapsed += line.elapsed)
                return { ...data, waiting, elapsed: formatSecondsToMinutes(elapsed) }
            })

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

    return { offices, setOffices, status, error }
}

export default useFetchSort