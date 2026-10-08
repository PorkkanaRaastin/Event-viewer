const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.token
        ? { headers: { Authorization: `Bearer ${user.token}` } }
        : {}
}

export default getAuthHeader