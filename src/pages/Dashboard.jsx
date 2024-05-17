import { Box, Button } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar'
import DashboardMain from '../components/DashboardMain'
import { PageParent } from '../components/uiElements/AllContainers'

const Dashboard = () => {
  return (

    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      background: 'var(--bg-main)'
    }}>
      <Sidebar />

      <DashboardMain />

    </Box>
  )
}

export default Dashboard