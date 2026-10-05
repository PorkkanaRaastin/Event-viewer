import profileIcon from '../assets/profile.svg'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const AdminUserList = ({ users, onDelete }) => {
    return (
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
                                onClick={() => onDelete(user.id)}
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
    )
}

export default AdminUserList