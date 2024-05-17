import React, { useRef, useState } from 'react'
import { FlexBox, PageParent } from './uiElements/AllContainers'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const CreateEntityPopup = ({ handleClose }) => {

    const handleDialogClose = () => {
        handleClose(false)
    }

    const titleRef = useRef()
    const navigate = useNavigate()
    const [helperText, setHelperText] = useState(null)

    const generateRandomEntityId = () => {
        const ds = Date.now().toString()
        const id = "table_" +  Math.ceil(Math.random()*10000000) +  ds

        return id
    }

    const handleCreate = (e) => {
        e.preventDefault()
        const data = titleRef.current.value
        if (data === "") {
            setHelperText('Please set the entity title!')
            return
        }

        const tableId = generateRandomEntityId()

        const newTable = {
            name: data,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            id: tableId,
        }
        // save the table to DB

        // On success -> Redirect
        navigate(`/edit-entity/${tableId}`)

        // On Failure -> 
        setHelperText('Something went wrong! Please try again later.')
    }

    return (
        <>
            {/* Backdrop */}
            <FlexBox
                onClick={handleDialogClose}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#00000040',
                    width: '100vw',
                    height: '100vh',
                }}>
            </FlexBox >

            {/* MODAL */}
            <PageParent sx={{
                zIndex: 100,
                alignItems: 'flex-start',
                padding: '2.5rem',
                position: 'absolute',
                width: 'max-content',
                borderRadius: '0.25rem',
                boxShadow: 'var(--box-shadow-popup)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                backgroundColor: 'white',
            }}>
                <Typography variant='h5' mb={'1rem'}>Create Entity</Typography>
                <TextField
                    error={helperText ? true : false}
                    onChange={() => {
                        if (helperText != null) setHelperText(null)
                    }}
                    helperText={helperText}
                    inputRef={titleRef} size='small' variant='outlined' 
                    placeholder='Entity Name'
                    label='Entity Name'
                     autoFocus />
                <Button onClick={handleCreate} variant='outlined' > Create</Button>
            </PageParent>
        </>
    )
}

export default CreateEntityPopup