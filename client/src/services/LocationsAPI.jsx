// base path for the locations API (vite proxies /api to the server)
const BASE_URL = '/api/locations'

// get all locations from the database
const getAllLocations = async () => {
    try {
        const response = await fetch(BASE_URL)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error getting locations:', error)
        return []
    }
}

// get a single location by its id
const getLocationById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error getting location ${id}:`, error)
        return null
    }
}

export default {
    getAllLocations,
    getLocationById
}
