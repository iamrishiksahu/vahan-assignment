import React from 'react'
import { FlexBox, GridBox } from './uiElements/AllContainers'
import { Box, Typography } from '@mui/material'
import { ENTITY_TYPES } from '../utils/EntityTypes';

const EntityTypeSidebar = () => {

    const colorsArray = [
        { name: 'Dark Red', primary: '#00bf7d', secondary: '#00bf7d08' },
        { name: 'Dark Blue', primary: '#054fb9', secondary: '#054fb908' },
        { name: 'Dark Green', primary: '#b51963', secondary: '#b5196308' },
        { name: 'Dark Purple', primary: '#800080', secondary: '#80008008' },
        { name: 'Dark Cyan', primary: '#e6308a', secondary: '#e6308a08' },
        { name: 'Dark Yellow', primary: '#c44601', secondary: '#c4460108' },
        { name: 'Dark Gray', primary: '#5ba300', secondary: '#5ba30008' },
        { name: 'Maroon', primary: '#800000', secondary: '#80000008' }
    ];

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

    let fieldTypes = []

    const generateFieldTypesArray = () => {
        fieldTypes = Object.keys(ENTITY_TYPES).map((key, idx) => {
            const item = ENTITY_TYPES[key];
            return (
                {
                    ...item,
                    name: item.name.slice(0,1) + item.name.slice(1).toLowerCase(),
                    primaryColor: colorsArray[idx % colorsArray.length].primary,
                    secondaryColor: colorsArray[idx % colorsArray.length].secondary,
                }
            )
        })

    }

    generateFieldTypesArray()

    return (
        <GridBox cols={2}>
            {fieldTypes.map((item, idx) => {
                return (

                    <SideBarItem key={idx} name={item.name} primaryColor={item.primaryColor} secondaryColor={item.secondaryColor} icon={'fa fa-text-width'} />

                )
            })}


        </GridBox>
    )
}

const SideBarItem = ({ name, icon, primaryColor, secondaryColor}) => {
    return (
        <FlexBox sx={{
            border: '1px solid #e1e1e1',
            padding: '0.75rem',
            borderRadius: '0.25rem',
            gap: '0.5rem',
            justifyContent: 'left',
            cursor: 'pointer',
            transition: 'all 100ms ease',
            "&:hover":{
                backgroundColor: '#f8faff',
                boxShadow: '0 0 10px #f8faff',
                transform: 'scale(1.02)'
            },
            "&:active":{
                transform: 'scale(0.98)'
            }

        }}>
            <Box sx={{
                borderRadius: '0.25rem',
                backgroundColor: secondaryColor,
                display: 'flex',
                width: '2rem',
                height: '2rem',
                alignItems: 'center',
                justifyContent: 'center'

            }}>

                <i className={icon} style={{ color: primaryColor }} />

            </Box>

            <Typography>{name}</Typography>

        </FlexBox>
    )
}

export default EntityTypeSidebar