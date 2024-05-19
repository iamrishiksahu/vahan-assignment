import React from 'react'
import { FlexBox, PageParent } from './uiElements/AllContainers'
import { Typography } from '@mui/material'

const Sidebar = () => {
    return (
        <PageParent sx={{
            width: '14rem',
            height: '100vh',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: 'var(--color-primary-light)',
            paddingTop: '2.5rem',
            paddingLeft: '2rem',
        }}>

            {/* Add App Logo */}

            <Typography variant='h4' sx={{ fontWeight: 700, color: 'var(--color-primary)' }}>CMS'ify</Typography>
            <Typography variant='h5' mt={'3rem'}>Tech Stack</Typography>
            <FlexBox column sx={{ color: '#444', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Typography variant='body2'>Backend: NodeJS</Typography>
                <Typography variant='body2'>Fronted: ReactJS</Typography>
                <Typography variant='body2'>Deployed: Vercel</Typography>
                <Typography variant='body2'>DB: PostgreSQL</Typography>
                <Typography variant='body2'>DB Provider: Render</Typography>
            </FlexBox>
            <Typography variant='h5' mt={'3rem'}>Libraries</Typography>
            <FlexBox column sx={{ color: '#444', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Typography variant='body2'>API: Axios</Typography>
                <Typography variant='body2'>UI: MaterialUI</Typography>
                <Typography variant='body2'>Server: ExpressJS</Typography>
                <Typography variant='body2'>Icons: Font Awesome</Typography>
            </FlexBox>


            <FlexBox column mt={'3rem'} sx={{ color: '#444', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Typography variant='body2'>Developed in 48 Hours over 10 days.</Typography>
            </FlexBox>

        </PageParent>
    )
}

export default Sidebar

const SidebarItem = ({ icon, title }) => {

    return (
        <FlexBox sx={{
            justifyContent: 'flex-start'
        }}>
            <i className={icon} style={{ color: 'grey' }} />
            <Typography variant='p'>{title}</Typography>
        </FlexBox>
    )
}