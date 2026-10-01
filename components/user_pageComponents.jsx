import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import createEventIcon from '../assets/createEvent.svg'
import profileIcon from '../assets/profile.svg'
import eventService from '../src/services/events'
import registrationService from '../src/services/registrations'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

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
    const [addHover, setAddHover] = useState(false)
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
            <div className='userEventBox'>
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
                                    <span>{registrations.length} participants </span>
                                    {myRegistration ? (
                                        <Button variant='contained' size='small' color='error' onClick={() => handleLeave(myRegistration.id)}>Leave</Button>
                                    ) : (
                                        <Button variant='contained' size='small' color='success' onClick={() => handleJoin(event.id)}>Join</Button>
                                    )}
                                    {loggedUser && event.userId === loggedUser.id && (
                                        <IconButton color='error' onClick={() => handleDelete(event.id)} ><DeleteIcon /></IconButton>
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