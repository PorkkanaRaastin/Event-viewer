import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import profileIcon from '../assets/profile.svg'
import createEventIcon from '../assets/createEvent.svg'
import eventService from '../src/services/events'
import userService from '../src/services/users'
import AdminEventForm from './AdminEventForm.jsx'
import AdminEventList from './AdminEventList.jsx'
import AdminUserList from './AdminUserList.jsx'
import IconButton from '@mui/material/IconButton'

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

const AdminPageComponents = ({ events, setEvents }) => {
    const [showForm, setShowForm] = useState(false)
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        date: '',
        location: ''
    })
    const [users, setUsers] = useState([])

    const loggedUser = JSON.parse(window.localStorage.getItem('user'))

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
        const user = users.find(u => u.id === id)
        if (!window.confirm(`Delete user "${user?.username}" and all their events?`)) {
            return
        }

        try {
            await userService.remove(id)
            const updatedUsers = users.filter(user => user.id !== id)
            setUsers(updatedUsers)

            const updatedEvents = await eventService.getAll()
            setEvents(updatedEvents)
        } catch (error) {
            console.log('user deletion failed', error)
        }
    }

    return (
        <div>
            <div className='EventsUsers'>
                <h1 className='EventText'>Events</h1>
                <h1 className='UsersText'>Users</h1>
            </div>

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
                <img src={createEventIcon} alt="Add Event" className='calendarImg' width="35px" height="35px" />
            </IconButton>

            {showForm && (
                <AdminEventForm
                    newEvent={newEvent}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={() => setShowForm(false)}
                />
            )}

            <div className='adminBoxes'>
                <AdminEventList events={events} users={users} onDelete={handleDelete} />
                <AdminUserList users={users} onDelete={handleUserDelete} />
            </div>
        </div>
    )
}

export { AdminPageComponents, UserProfile }