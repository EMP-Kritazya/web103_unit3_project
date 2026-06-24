// base path for the events API (vite proxies /api to the server)
const BASE_URL = '/api/events'

// get all events from the database
const getAllEvents = async () => {
    try {
        const response = await fetch(BASE_URL)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error getting events:', error)
        return []
    }
}

// get a single event by its id
const getEventById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error getting event ${id}:`, error)
        return null
    }
}

export default {
    getAllEvents,
    getEventById
}
