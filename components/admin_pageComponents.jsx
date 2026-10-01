import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import profileIcon from '../assets/profile.svg'
import createEventIcon from '../assets/createEvent.svg'
import eventService from '../src/services/events'
import userService from '../src/services/users'
import EventCard from './EventCard.jsx'
import { useColorScheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'

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
    const [addHover, setAddHover] = useState(false)
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

    const textFieldStyle = {
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#a78bfa' },
        '& .MuiInput-underline:before': { borderBottomColor: 'white' },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#a78bfa' },
        '& .MuiInput-underline:after': { borderBottomColor: '#a78bfa' },
        '& .MuiInputBase-input': { color: 'white' }
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
                <div className='calenderPopup' onClick={() => setShowForm(false)}>
                    <form onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
                        <IconButton
                            onClick={() => setShowForm(false)}
                            sx={{
                                width: 32,
                                height: 32,
                                border: '2px solid white',
                                color: 'white',
                                fontSize: '18px',
                                outline: 'none',
                                '&:focus': {
                                    outline: 'none'
                                },
                                '&.Mui-focusVisible': {
                                    outline: 'none',
                                    boxShadow: 'none'
                                },
                                '&:hover': {
                                    borderColor: '#ef4444',
                                    color: '#ef4444',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)'
                                }
                            }}
                        >
                            ×
                        </IconButton>

                        <div>
                            <TextField
                                label="Name"
                                variant="standard"
                                name="name"
                                value={newEvent.name}
                                onChange={handleChange}
                                required
                                sx={textFieldStyle}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Description"
                                variant="standard"
                                name="description"
                                value={newEvent.description}
                                onChange={handleChange}
                                required
                                sx={textFieldStyle}
                            />
                        </div>
                        <div>
                            <TextField
                                variant="standard"
                                name="date"
                                type="date"
                                value={newEvent.date}
                                onChange={handleChange}
                                required

                                sx={textFieldStyle}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Location"
                                variant="standard"
                                name="location"
                                placeholder='Location'
                                value={newEvent.location}
                                onChange={handleChange}
                                required
                                sx={textFieldStyle}
                            />
                        </div>
                        <button
                            type='submit'
                            onMouseEnter={() => setAddHover(true)}
                            onMouseLeave={() => setAddHover(false)}
                            style={{
                                boxShadow: addHover ? '0 0 12px 4px rgba(37, 176, 67, 0.8)' : 'none',
                                transform: addHover ? 'translateY(-2px)' : 'none',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                        >
                            Add
                        </button>
                    </form>
                </div>
            )}

            <div className='adminBoxes'>
                <div className='adminEventBox'>
                    {events.length === 0 ? (
                        <p>No Events.</p>
                    ) : (
                        <div className='eventBox'>
                            {events.length === 0 ? (
                                <p>No Events.</p>
                            ) : (
                                <div>
                                    {events.map(event => (
                                        <EventCard key={event.id} event={event} onDelete={handleDelete} users={users} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className='userBox'>
                    {users.length === 0 ? (
                        <p>No Users.</p>
                    ) : (
                        <div>
                            {users.map(user => (
                                <div className='userCard' key={user.id} style={{ borderLeft: '6px solid #d94a4a' }}>
                                    <img src={profileIcon} style={{ background: 'black', borderRadius: '12px' }} />
                                    <div><strong>{user.username}</strong></div>
                                    <IconButton
                                        color='error'
                                        onClick={() => handleUserDelete(user.id)}
                                        sx={{
                                            transition: 'background-color 0.2s ease, color 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                                                color: '#ef4444'
                                            }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export { AdminPageComponents, UserProfile }