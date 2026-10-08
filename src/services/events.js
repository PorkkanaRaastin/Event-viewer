import axios from 'axios'
import getAuthHeader from './authHeader'

const baseUrl = '/api/events'

const getAll = async () => {
    const response = await axios.get(baseUrl, getAuthHeader())
    return response.data
}

const create = async (newEvent) => {
    const response = await axios.post(baseUrl, newEvent, getAuthHeader())
    return response.data
}

const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`, getAuthHeader())
}

export default { getAll, create, remove }