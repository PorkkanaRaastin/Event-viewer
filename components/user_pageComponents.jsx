import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import createEventIcon from '../assets/createEvent.svg'
import profileIcon from '../assets/profile.svg'
import eventService from '../src/services/events'
import registrationService from '../src/services/registrations'

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [showMenu, setShowMenu] = useState(null)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/Login')
    }

    return (
        <div className='pfolileWrapper'>
            <div className='profileText' onClick={() => setShowMenu(!showMenu)}>
                <img src={profileIcon} alt="profileIcon" width='40px' height='40px' />
                <h2>{user?.username}</h2>
            </div>

            {showMenu && (
                <div className='profileMenu'>
                    <div className='profileMenuContent'>
                        <p>sadsaa</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}
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

    const loggedUser = JSON.parse(window.localStorage.getItem('user'))

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!loggedUser) {
            console.log('you are not logged in')
            return
        }

        try {
            const created = await eventService.create({
                ...newEvent,
                userId: loggedUser.id
            })
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

    const handleJoin = async (eventId) => {
        if (!loggedUser) {
            console.log('you are not logged in')
            return
        }
        try {
            await registrationService.create({ userId: loggedUser.id, eventId})
            const updated = await eventService.getAll()
            setEvents(updated)
        } catch (error) {
            console.log('joinin event failde', error)
        }
    }

    const handleLeave = async (registrationId) => {
        try {
            await registrationService.remove(registrationId)
            const updated = await eventService.getAll()
            setEvents(updated)
        } catch (error) {
            console.log('leaving event failed', error)
        }
    }

    return (
        <div>
            <div className='userHeader'>
                <h1>Events</h1>
                <button onClick={() => setShowForm(!showForm)} style={{ background: 'none', border: 'none' }}>
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
                        {events.map(event => {
                            const registrations = event.registrations || []
                            const myRegistration = loggedUser
                                ? registrations.find(r => r.userId === loggedUser.id)
                                : null
                            return (
                                <div className='eventCard' key={event.id} style={{ borderLeft: '6px solid #4a90d9', padding: '8px', marginBottom: '15px' }}>
                                    <div><strong>{event.name}</strong></div>
                                    <div>{new Date(event.date).toLocaleDateString('fi-FI')}</div>
                                    <div>{event.location}</div>
                                    <p>
                                        Created by: {loggedUser && event.userId === loggedUser.id ? 'You' : event.user?.username}
                                    </p>
                                    <span>{registrations.length} participants</span>
                                    {myRegistration ? (
                                        <button onClick={() => handleLeave(myRegistration.id)}>Leave</button>
                                    ) : (
                                        <button onClick={() => handleJoin(event.id)}>Join</button>
                                    )}
                                    {loggedUser && event.userId === loggedUser.id && (
                                        <button onClick={() => handleDelete(event.id)}>Delete</button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export { UserPageComponent, UserProfile }