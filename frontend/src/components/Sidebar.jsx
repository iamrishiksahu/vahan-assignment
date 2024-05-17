import React from 'react'
import { FlexBox, PageParent } from './uiElements/AllContainers'
import { Typography } from '@mui/material'

const Sidebar = () => {
  return (
    <PageParent sx={{
        width: '16rem',
        height: '100vh',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'var(--color-primary-light)'
    }}>

        {/* Add App Logo */}

        <SidebarItem icon={"fa fa-home"} title='Dashboard'/>
        <SidebarItem icon={"fa fa-home"} title='Entities'/>

    </PageParent>
  )
}

export default Sidebar

const SidebarItem = ({icon, title}) => {

    return(
        <FlexBox sx={{
            justifyContent: 'flex-start'
        }}>
            <i className={icon} style={{color: 'grey'}}/>
            <Typography variant='p'>{title}</Typography>
        </FlexBox>
    )
}