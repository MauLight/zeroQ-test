import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKENDURL

function useFetchSort() {
    async function getAllServices() {
        try {
            const { data } = await axios.get(backendUrl)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
}

export default useFetchSort