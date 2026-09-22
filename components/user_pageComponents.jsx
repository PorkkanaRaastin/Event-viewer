const UserPageComponent = ({ events }) => {
    if (events.length === 0) {
        return <p>No Events.</p>
    }

    return (
        <div>
            {events.map(event => (
                <div key={event.id} style={{ borderLeft: '4px solid #4a90d9', padding: '8px', marginBottom: '8px' }}>
                    <div><strong>{event.name}</strong></div>
                    <div>{new Date(event.date).toLocaleDateString('fi-FI')}</div>
                    <div>{event.location}</div>
                </div>
            ))}

        </div>
    )
}

export default UserPageComponent