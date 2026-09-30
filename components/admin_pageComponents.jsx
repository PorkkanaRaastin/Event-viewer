import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import profileIcon from '../assets/profile.svg'
import createEventIcon from '../assets/createEvent.svg'
import eventService from '../src/services/events'
import userService from '../src/services/users'

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
            <img src={profileIcon} alt="profileIcon" width='40px' height='40px'/>
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
            .then(data => setUsers(data.filter(user => !user.isAdmin)))
            .catch(error => console.log('failed to load users', error))
    }, [])

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loggedUser = JSON.parse(window.localStorage.getItem('user'))

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
            <div className='EventsUsers'>
                <h1 className='EventText'>Events</h1>
                <h1 className='UsersText'>Users</h1>
            </div>
            <button onClick={() => setShowForm(!showForm)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <img src={createEventIcon} alt="Add Event" className='calendarImg' />
            </button>

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

            <div className='adminBoxes'>
                <div className='adminEventBox'>
                    {events.length === 0 ? (
                        <p>No Events.</p>
                    ) : (
                        <div>
                            {events.map(event => (
                                <div className='eventCard' key={event.id} style={{ borderLeft: '4px solid #4a90d9', padding: '8px', marginBottom: '8px' }}>
                                    <div><strong>{event.name}</strong></div>
                                    <div>{new Date(event.date).toLocaleDateString('fi-FI')}</div>
                                    <div>{event.location}</div>
                                    <button onClick={() => handleDelete(event.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='userBox'>
                    {users.length === 0 ? (
                        <p>No Users.</p>
                    ) : (
                        <div>
                            {users.map(user => (
                                <div className='userCard' key={user.id} style={{ borderLeft: '4px solid #d94a4a', padding: '8px', marginBottom: '8px' }}>
                                    <div><strong>{user.username}</strong></div>
                                    <button onClick={() => handleUserDelete(user.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export  {AdminPageComponents, UserProfile}