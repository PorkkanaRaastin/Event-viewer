import { useState } from 'react'

const EventCard = ({ event, onDelete, users = [], loggedUser, onJoin, onLeave }) => {
    const [expanded, setExpanded] = useState(false)
    const participants = event.participants || event.registrations || []
    
    const getUsername = (userId) => {
        const user = users.find(u => u.id === userId)
        return user ? user.username : `Käyttäjä #${userId}`
    }

    const myRegistration = loggedUser
        ? participants.find(p => p.userId === loggedUser.id)
        : null
    const isOwner = loggedUser && event.userId === loggedUser.id

    return (
        <div className='eventCard'>
            <div className='eventCardHeader'>
                <div>
                    <strong>{event.name}</strong>
                    <div>{new Date(event.date).toLocaleDateString('fi-FI')}</div>
                </div>
                <button className='showMoreBtn' onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Näytä vähemmän' : 'Näytä lisää'}
                </button>
            </div>

            {expanded && (
                <div className='eventCardDetails'>
                    <div>{event.location}</div>
                    <div>{event.description}</div>
                    {loggedUser && (
                        <p>
                            Created by: {isOwner ? 'You' : event.user?.username}
                        </p>
                    )}
                    <hr className='eventCardDivider' />
                    <div className='participants'>
                        {participants.length === 0 ? (
                            <p>Osallistujat: 0</p>
                        ) : users.length > 0 ? (
                            <>
                                <p>Osallistujat:</p>
                                <ul>
                                    {participants.map((p) => (
                                        <li key={p.id}>{getUsername(p.userId)}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>Osallistujat: {participants.length}</p>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {onJoin && onLeave && (
                            myRegistration ? (
                                <button className='deleteBtn' onClick={() => onLeave(myRegistration.id)}>Leave</button>
                            ) : (
                                <button className='deleteBtn' onClick={() => onJoin(event.id)}>Join</button>
                            )
                        )}
                        {(!loggedUser || isOwner) && (
                            <button className='deleteBtn' onClick={() => onDelete(event.id)}>Delete</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventCard