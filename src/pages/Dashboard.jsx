import { Box, Button } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar'
import DashboardMain from '../components/DashboardMain'
import { PageParent } from '../components/uiElements/AllContainers'
import { Route, Routes } from 'react-router-dom'
import EntityPage from './EntityPage'
import EditEntity from './EditEntity'

const Dashboard = () => {
  return (

    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      background: 'var(--bg-main)'
    }}>
      <Sidebar />


        <Routes>
          <Route index element={<DashboardMain />} />
          <Route path='entity/:id' element={<EntityPage />} />
          <Route path='edit-entity/:id' element={<EditEntity />} />
        </Routes>
    </Box>
  )
}

export default Dashboard