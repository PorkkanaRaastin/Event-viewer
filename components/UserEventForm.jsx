import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

const textFieldStyle = {
    '& .MuiInputLabel-root': { color: 'white' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#a78bfa' },
    '& .MuiInput-underline:before': { borderBottomColor: 'white' },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#a78bfa' },
    '& .MuiInput-underline:after': { borderBottomColor: '#a78bfa' },
    '& .MuiInputBase-input': { color: 'white' }
}

const UserEventForm = ({ newEvent, onChange, onSubmit, onClose }) => {
    const [addHover, setAddHover] = useState(false)

    return (
        <div className='calenderPopup' onClick={onClose}>
            <form onSubmit={onSubmit} onClick={(event) => event.stopPropagation()}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        width: 32,
                        height: 32,
                        border: '2px solid white',
                        color: 'white',
                        fontSize: '18px',
                        outline: 'none',
                        '&:focus': { outline: 'none' },
                        '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
    )
}

export default UserEventForm