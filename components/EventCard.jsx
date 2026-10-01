import { useState } from 'react'

const EventCard = ({ event, onDelete, users = [] }) => {
    const [expanded, setExpanded] = useState(false)

    const participants = event.participants || event.registrations || []

    const getUsername = (userId) => {
        const user = users.find(u => u.id === userId)
        return user ? user.username : `Käyttäjä #${userId}`
    }

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

                    <hr className='eventCardDivider' />

                    <div className='participants'>
                        {participants.length === 0 ? (
                            <p>Osallistujat: 0</p>
                        ) : (
                            <>
                                <p>Osallistujat:</p>
                                <ul>
                                    {participants.map((p) => (
                                        <li key={p.id}>{getUsername(p.userId)}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    <button className='deleteBtn' onClick={() => onDelete(event.id)}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default EventCard