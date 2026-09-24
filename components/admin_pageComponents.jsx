import { useState, useEffect } from 'react'
import createEventIcon from '../assets/createEvent.svg'
import eventService from '../src/services/events'
import userService from '../src/services/users'

const AdminPageComponents = ({ events, setEvents }) => {
    const [showForm, setShowForm] = useState(false)
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        date: '',
        location: ''
    })
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll()
            .then(data => setUsers(data))
            .catch(error => console.log('failed to load users', error))
    }, [])

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const created = await eventService.create(newEvent)
            setEvents(events.concat(created))
            setNewEvent({ name: '', description: '', date: '', location: '' })
            setShowForm(false)
        } catch (error) {
            console.log('event creation failed', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await eventService.remove(id)
            const updated = await eventService.getAll()
            setEvents(updated)
        } catch (error) {
            console.log('event deletion failed', error)
        }
    }

    const handleUserDelete = async (id) => {
        try {
            await userService.remove(id)
            setUsers(users.filter(user => user.id !== id))
        } catch (error) {
            console.log('user deletion failde', error)
        }
    }

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <img src={createEventIcon} alt="Add Event" />
            </button>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <input name="name" placeholder='Name' value={newEvent.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <input name="description" placeholder='Description' value={newEvent.description} onChange={handleChange} required />
                    </div>
                    <div>
                        <input name="date" type="date" value={newEvent.date} onChange={handleChange} required />
                    </div>
                    <div>
                        <input name="location" placeholder='Location' value={newEvent.location} onChange={handleChange} required />
                    </div>
                    <button type='submit'>Add</button>
                </form>
            )}

            {events.length === 0 ? (
                <p>No Events.</p>
            ) : (
                <div>
                    {events.map(event => (
                        <div key={event.id} style={{ borderLeft: '4px solid #4a90d9', padding: '8px', marginBottom: '8px' }}>
                            <div><strong>{event.name}</strong></div>
                            <div>{new Date(event.date).toLocaleDateString('fi-FI')}</div>
                            <div>{event.location}</div>
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}

            <h1>Users</h1>
            {users.length === 0 ? (
                <p>No Users.</p>
            ) : (
                <div>
                    {users.map(user => (
                        <div key={user.id}>
                            <div><strong>{user.username}</strong></div>
                            <button onClick={() => handleUserDelete(user.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminPageComponents