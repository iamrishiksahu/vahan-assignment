import React from 'react'
import { PageParent } from './uiElements/AllContainers'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const EntityCard = ({ entity }) => {

    const navigate = useNavigate()

    return (
        <PageParent
            onClick={() => navigate(`entity/${entity.id}`)}
            className='entity-card'
            sx={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            }}>
            <Typography variant='h6'>{entity.name}</Typography>
            <Typography
                variant='body2'
                color={'#444'}
            >{entity.description.substring(0, 50)}{+ entity.description.length > 50 ? "..." : ""}</Typography>
            <i style={{
                color: '#e1e1e1',
            }} className='fa fa-long-arrow-right' />

        </PageParent>
    )
}

export default EntityCard