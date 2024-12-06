import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import isEqual from 'lodash/isEqual'
import axios from 'axios'

import { formatSecondsToMinutes, logInDev } from '@/utils/functions'
import { OfficesProps } from '@/utils/types'

const backendUrl = import.meta.env.VITE_BACKENDURL

function useFetchSort() {
    //* Ref to the initial state of data to diff with client based state and determine updates in dynamic fetch.
    const [initialValues, setInitialValues] = useState<OfficesProps[]>([])
    //* Main state for fetched data.
    const [offices, setOffices] = useState<OfficesProps[]>([])
    //*Fetch status to determine client-side rendering.
    const [status, setStatus] = useState<'idle' | 'pending' | 'rejected' | 'success'>('idle')
    const [error, setError] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')

    //*Ref to current values of offices and initialValues
    const currOffices = useRef<OfficesProps[]>(offices)
    const initialValuesRef = useRef<OfficesProps[]>(initialValues)

    //*Update refs when changes occur.
    useEffect(() => {
        currOffices.current = offices
    }, [offices])

    useEffect(() => {
        initialValuesRef.current = initialValues
    }, [initialValues])

    //* GetOffices diffs currOffices with initialValues to determine if a search is taking place, or if fetched data equals last fetched data, in which case it skips update.
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

    //* searchData triggers whenever searchTerm changes, or when the backspace key is pressed.
    function searchData() {
        if (searchTerm.length === 1) {
            setOffices(initialValuesRef.current)
        } else {
            setOffices((prev) => prev.filter(elem => elem.name.toLowerCase().includes(searchTerm.toLowerCase())))
        }
    }

    //* useCallback ensures unnecesary renders from calling handle ToggleOnline from different components.
    const handleToggleOnline = useCallback((id: number) => {
        setOffices(prevOffices => {
            const toggledMap = prevOffices.map((office) => office.id === id ? { ...office, online: !office.online } : office).sort((a, b) => Number(b.online) - Number(a.online))
            const toggledMapInitialValues = initialValuesRef.current.map((office) => office.id === id ? { ...office, online: !office.online } : office).sort((a, b) => Number(b.online) - Number(a.online))
            currOffices.current = toggledMap
            setInitialValues(toggledMapInitialValues)
            return toggledMap
        })
    }, [setOffices])

    //* Get fetch started before first painting.
    useLayoutEffect(() => {
        getOffices()
        const fetchInterval = setInterval(getOffices, 60000)
        return () => clearInterval(fetchInterval)
    }, [])

    useEffect(() => {
        searchData()
    }, [searchTerm])

    return { offices, setOffices, status, error, searchTerm, setSearchTerm, handleToggleOnline }
}

export default useFetchSort