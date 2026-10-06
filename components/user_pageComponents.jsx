import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../src/services/users'
import createEventIcon from '../assets/createEvent.svg'
import profileIcon from '../assets/profile.svg'
import eventService from '../src/services/events'
import registrationService from '../src/services/registrations'
import IconButton from '@mui/material/IconButton'
import UserEventForm from './UserEventForm.jsx'
import UserEventList from './UserEventList.jsx'

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
                        <p>{user?.username}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const UserPageComponent = ({ events, setEvents }) => {
    const [showForm, setShowForm] = useState(false)
    const [users, setUsers] = useState([])
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        date: '',
        location: ''
    })

    const loggedUser = JSON.parse(window.localStorage.getItem('user'))

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
        const event = events.find(e => e.id === id)
        if (!window.confirm(`Delete event "${event?.name}" ?`)) {
            return
        }

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
            await registrationService.create({ userId: loggedUser.id, eventId })
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
                <IconButton
                    onClick={() => setShowForm(!showForm)}
                    style={{ background: 'none', border: 'none' }}
                    sx={{
                        '&:hover img': {
                            transform: 'scale(1.15)',
                            filter: 'drop-shadow(0 0 6px #a78bfa)'
                        },
                        '& img': {
                            transition: 'transform 0.2s ease, filter 0.2s ease'
                        }
                    }}>
                    <img src={createEventIcon} alt="Add Event" width="35px" height="35px" />
                </IconButton>
            </div>

            {showForm && (
                <UserEventForm
                    newEvent={newEvent}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={() => setShowForm(false)}
                />
            )}

            <UserEventList
                events={events}
                users={users}
                loggedUser={loggedUser}
                onDelete={handleDelete}
                onJoin={handleJoin}
                onLeave={handleLeave}
            />
        </div>
    )
}

export { UserPageComponent, UserProfile }