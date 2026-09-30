import { useState, useEffect } from 'react'
import eventService from '../src/services/events'
import {AdminPageComponents, UserProfile} from '../components/admin_pageComponents'

const AdminPage = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        eventService.getAll().then(data => setEvents(data))
    }, [])

    return (
        <div>
            <UserProfile />
            <AdminPageComponents events={events} setEvents={setEvents} />
        </div>
    )
}

export default AdminPage