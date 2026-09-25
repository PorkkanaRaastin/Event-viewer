import axios from 'axios'

const baseUrl = '/api/registrations'

const create = async (registrations) => {
    const response = await axios.post(baseUrl, registrations)
    return response.data
}

const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
}

export default { create, remove}