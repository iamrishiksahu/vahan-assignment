import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { PageParent } from './uiElements/AllContainers'
import CreateEntityPopup from './CreateEntityPopup'

const DashboardMain = () => {
    const [createEntityOpen, setCreateEntityOpen] = useState(false)
    return (
        <PageParent sx={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        }}>
            <Typography variant='h4'> Hi, Welcome Back!</Typography>

            <Button onClick={() => setCreateEntityOpen(true)}>
                Create Entity
            </Button>

            {createEntityOpen && <CreateEntityPopup handleClose={setCreateEntityOpen} handleCreate={() => { }} />}
        </PageParent>

    )
}

export default DashboardMain