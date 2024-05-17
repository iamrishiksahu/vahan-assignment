import React from 'react'
import { FlexBox, PageParent } from './uiElements/AllContainers'
import { Box, Button, TextField, Typography } from '@mui/material'

const CreateEntityPopup = ({ handleClose, handleCreate }) => {

    const handleDialogClose = () => {
        handleClose(false)
    }
    return (
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
            <PageParent sx={{
                position: 'absolute',
                width: 'max-content',
                borderRadius: '0.25rem',
                boxShadow: 'var(--box-shadow-popup)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                backgroundColor: 'white',
            }}>
                <Typography>Create Entity</Typography>
                <Typography>Entity Name</Typography>
                <TextField size='small' variant='outlined' placeholder='enter name...' autoFocus />
                <Button onClick={handleDialogClose} > Create</Button>
        </PageParent>
        </FlexBox >
    )
}

export default CreateEntityPopup