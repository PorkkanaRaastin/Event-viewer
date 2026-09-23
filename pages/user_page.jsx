import { useState, useEffect } from 'react'
import eventService from '../src/services/events'
import UserPageComponent from '../components/user_pageComponents'

const UserPage = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        eventService.getAll().then(data => setEvents(data))
    }, [])

    return (
        <div>
            <h1>Events</h1>
            <UserPageComponent events={events} setEvents={setEvents}/>
        </div>
    )
}

export default UserPage