import React from 'react'
import { Box } from '@mui/material'

const EntityIconContainer = ({ icon, color, bgColor }) => {
    return (
        <Box sx={{
            borderRadius: '0.25rem',
            backgroundColor: bgColor,
            display: 'flex',
            width: '2rem',
            height: '2rem',
            alignItems: 'center',
            justifyContent: 'center'

        }}>

            <i className={icon} style={{ color: color }} />

        </Box>

    )
}

export default EntityIconContainer