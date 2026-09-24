import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, remove }