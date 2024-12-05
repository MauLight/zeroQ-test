import axios from 'axios'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import isEqual from 'lodash/isEqual'
import { OfficesProps } from '@/utils/types'
import { logInDev } from '@/utils/functions'

const backendUrl = import.meta.env.VITE_BACKENDURL

function useFetchSort() {
    const [initialValues, setInitialValues] = useState<OfficesProps[]>([])
    const [offices, setOffices] = useState<OfficesProps[]>([])
    const [status, setStatus] = useState<'idle' | 'pending' | 'rejected' | 'success'>('idle')
    const [error, setError] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')

    const currOffices = useRef<OfficesProps[]>(offices)
    const initialValuesRef = useRef<OfficesProps[]>(initialValues)

    useEffect(() => {
        currOffices.current = offices
    }, [offices])

    useEffect(() => {
        initialValuesRef.current = initialValues
    }, [initialValues])

    function formatSecondsToMinutes(seconds: number): string {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    async function getOffices() {

        if (currOffices.current.length !== initialValuesRef.current.length) {
            logInDev('Searching...')
            return
        }

        try {
            setStatus('pending')
            const { data } = await axios.get(backendUrl)

            //* Immutable data sort to retain original data state.
            const sortedData: OfficesProps[] = [...data].sort((a, b) => Number(b.online) - Number(a.online))

            const mapSortedData = sortedData.map((data, i) => {
                let waiting = 0
                let elapsed = 0
                let online = data.online
                data.lines.forEach((line) => waiting += line.waiting)
                data.lines.forEach((line) => elapsed += line.elapsed)

                if (currOffices.current.length > 0) {
                    online = currOffices.current[i].online
                }

                return { ...data, online, waiting, elapsed: formatSecondsToMinutes(elapsed) }
            })

            if (isEqual(mapSortedData, initialValuesRef.current)) {
                logInDev('Data has not changed')
                setStatus('success')
                return
            }

            setOffices(mapSortedData)
            setInitialValues(mapSortedData)
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

    function searchData() {
        if (searchTerm.length === 1) {
            setOffices(initialValuesRef.current)
        } else {
            setOffices((prev) => prev.filter(elem => elem.name.toLowerCase().includes(searchTerm.toLowerCase())))
        }
    }

    function handleToggleOnline(id: number) {
        setOffices(prevOffices => {
            const toggledMap = prevOffices.map((office) => office.id === id ? { ...office, online: !office.online } : office).sort((a, b) => Number(b.online) - Number(a.online))
            const toggledMapInitialValues = initialValuesRef.current.map((office) => office.id === id ? { ...office, online: !office.online } : office).sort((a, b) => Number(b.online) - Number(a.online))
            currOffices.current = toggledMap
            setInitialValues(toggledMapInitialValues)
            return toggledMap
        })
    }

    useLayoutEffect(() => {
        getOffices()
        const fetchInterval = setInterval(getOffices, 6000)
        return () => clearInterval(fetchInterval)
    }, [])

    useEffect(() => {
        searchData()
    }, [searchTerm])

    return { offices, setOffices, status, error, searchTerm, setSearchTerm, handleToggleOnline }
}

export default useFetchSort