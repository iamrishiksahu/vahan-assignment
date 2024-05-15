import React from 'react'
import Sidebar from '../components/Sidebar'
import { Button, Typography } from '@mui/material'
import { FlexBox, PageParent } from '../components/uiElements/AllContainers'
import EntityTypeSidebar from '../components/EntityTypeSidebar'
import TextEntity from '../components/entities/EntityItem'
import EntityItem from '../components/entities/EntityItem'
import { ENTITY_TYPES } from '../utils/EntityTypes'

const Dashboard = () => {

  const handleFieldItemDelete = (id) => {
    alert(id)
  }
  return (
    // <Sidebar/>
    <PageParent sx={{ flexDirection: 'row' }}>
      <EntityTypeSidebar />
      <FlexBox column sx={{
        alignItems: 'flex-start'
      }}>
        <Button variant='outlined'>+ Create Entity</Button>

        <EntityItem handleDelete={handleFieldItemDelete} fieldName={'First Name'} type={ENTITY_TYPES.TEXT} id={123} />

      </FlexBox>

    </PageParent>

  )
}

export default Dashboard