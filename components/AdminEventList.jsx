import EventCard from './EventCard.jsx'

const AdminEventList = ({ events, users, onDelete }) => {
    return (
        <div className='adminEventBox'>
            {events.length === 0 ? (
                <p>No Events.</p>
            ) : (
                <div className='eventBox'>
                    <div>
                        {events.map(event => (
                            <EventCard key={event.id} event={event} onDelete={onDelete} users={users} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminEventList