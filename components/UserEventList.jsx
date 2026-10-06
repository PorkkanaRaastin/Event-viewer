import EventCard from './EventCard.jsx'

const UserEventList = ({ events, users, loggedUser, onDelete, onJoin, onLeave }) => {
    return (
        <div className='userEventBox'>
            {events.length === 0 ? (
                <p>No Events.</p>
            ) : (
                <div>
                    {events.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            users={users}
                            loggedUser={loggedUser}
                            onDelete={onDelete}
                            onJoin={onJoin}
                            onLeave={onLeave}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserEventList