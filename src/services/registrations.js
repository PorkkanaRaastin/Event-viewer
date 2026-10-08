import axios from 'axios'
import getAuthHeader from './authHeader'

const baseUrl = '/api/registrations'

const create = async (registrations) => {
    const response = await axios.post(baseUrl, registrations, getAuthHeader())
    return response.data
}

const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`, getAuthHeader())
}

export default { create, remove }