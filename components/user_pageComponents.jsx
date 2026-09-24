import { useState } from 'react'
import createEventIcon from '../assets/createEvent.svg'
import eventService from '../src/services/events'

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div>
            <h2>{user?.username}</h2>
        </div>
    )
}

const UserPageComponent = ({ events, setEvents }) => {
    const [showForm, setShowForm] = useState(false)
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        date: '',
        location: ''
    })

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value})
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

    return (
        <div>
            <div className='userHeader'>
                <h1>Events</h1>
                <button onClick={() => setShowForm(!showForm)} style={{ background: 'none', border: 'none'}}>
                <img src={createEventIcon} alt="Add Event" width="35px" height="35px" />
                </button>
            </div>

            {showForm && (
                <div className='calenderPopup' onClick={() => setShowForm(false)}>
                    <form onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
                        <button type='button' className='closebtn' onClick={() => setShowForm(false)}>×</button>

                        <div>
                            <input name="name" placeholder='Name' value={newEvent.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <input name="description" placeholder='Description' value={newEvent.description} onChange={handleChange} required />
                        </div>
                        <div>
                            <input name="date" type='date' value={newEvent.date} onChange={handleChange} required />
                        </div>
                        <div>
                            <input name="location" placeholder='Location' value={newEvent.location} onChange={handleChange} required />
                        </div>
                        <button type='submit'>Add</button>
                    </form>
                </div>
            )}
            <div className='eventBox'>
            {events.length === 0 ? (
                <p>No Events.</p>
            ) : (
                <div>
                    {events.map(event => (
                        <div className='eventCard' key={event.id} style={{ borderLeft: '6px solid #4a90d9', padding: '8px', marginBottom: '15px' }}>
                            <div><strong>{event.name}</strong></div>
                            <div>{new Date(event.date).toLocaleDateString('fi-FI')}</div>
                            <div>{event.location}</div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    )
}

export { UserPageComponent, UserProfile }