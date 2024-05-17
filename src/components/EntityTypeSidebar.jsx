import React from 'react'
import { FlexBox, GridBox } from './uiElements/AllContainers'
import { Box, Typography } from '@mui/material'
import { ENTITY_TYPES } from '../utils/EntityTypes';
import EntityIconContainer from './uiElements/EntityIconContainer';

const EntityTypeSidebar = ({ handleClick }) => {


    const mysqlDataTypes = [
        { name: 'INTEGER', description: 'Stores whole numbers without decimal points.' },
        { name: 'DECIMAL', description: 'Stores fixed-point numbers with a specified precision and scale.' },
        { name: 'FLOAT', description: 'Stores floating-point numbers with a specified precision.' },
        { name: 'CHAR', description: 'Fixed-length character string with a specified length.' },
        { name: 'VARCHAR', description: 'Variable-length character string with a maximum length.' },
        { name: 'DATE', description: 'Stores date values in the format YYYY-MM-DD.' },
        { name: 'TIME', description: 'Stores time values in the format HH:MM:SS.' },
        { name: 'DATETIME', description: 'Stores date and time values in the format YYYY-MM-DD HH:MM:SS.' },
        { name: 'BOOLEAN', description: 'Represents boolean values (true or false).' },
        { name: 'BLOB', description: 'Binary Large Object, used to store large binary data such as images or documents.' }
    ];


    return (
        <GridBox cols={2} sx={{ backgroundColor: '#fff', padding: '1rem' }}>
            {Object.keys(ENTITY_TYPES).map((keyName, idx) => {
                const item = ENTITY_TYPES[keyName]
                return (
                    <div onClick={() => handleClick(keyName)}>
                        <SideBarItem key={idx} name={item.name} primaryColor={item.primary} secondaryColor={item.secondary} icon={item.icon} />
                    </div>


                )
            })}


        </GridBox>
    )
}

const SideBarItem = ({ name, icon, primaryColor, secondaryColor }) => {
    return (
        <FlexBox
            sx={{
                border: '1px solid #e1e1e1',
                padding: '0.75rem',
                borderRadius: '0.25rem',
                gap: '0.5rem',
                justifyContent: 'left',
                cursor: 'pointer',
                transition: 'all 100ms ease',
                "&:hover": {
                    backgroundColor: '#f8faff',
                    boxShadow: '0 0 10px #f8faff',
                    transform: 'scale(1.02)'
                },
                "&:active": {
                    transform: 'scale(0.98)'
                }

            }}>

            <EntityIconContainer icon={icon} color={primaryColor} bgColor={secondaryColor} />

            <Typography>{name.slice(0, 1) + name.slice(1).toLowerCase()}</Typography>

        </FlexBox>
    )
}

export default EntityTypeSidebar