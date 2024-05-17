import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { FlexBox, PageParent } from '../components/uiElements/AllContainers'

const Page404 = () => {
    return (
        <PageParent gap={'2rem'} sx={{justifyContent: 'center', height: '100vh'}}>
            <img src='/images/404.jpg' alt='404-image' width={'300px'}></img>
            <Typography variant='h4'>Oops! This Page Doesn't Exists!</Typography>
            <Button variant='outlined' href='/'>Go to Home</Button>
        </PageParent>
    )
}

export default Page404