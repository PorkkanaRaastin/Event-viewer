import axios from 'axios'

const baseUrl = '/api/events'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newEvent) => {
    const response = await axios.post(baseUrl, newEvent)
    return response.data
}

const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove }