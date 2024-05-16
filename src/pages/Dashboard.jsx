import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Button, Typography } from '@mui/material'
import { FlexBox, PageParent } from '../components/uiElements/AllContainers'
import EntityTypeSidebar from '../components/EntityTypeSidebar'
import TextEntity from '../components/entities/EntityItem'
import EntityItem from '../components/entities/EntityItem'
import { ENTITY_TYPES } from '../utils/EntityTypes'

const Dashboard = () => {

  const [entityList, setEntityList] = useState([
    {
      fieldName: 'First Name',
      type: ENTITY_TYPES.TEXT,
      id: 'user.list.0',
      edit: false,
    },
    {
      fieldName: 'Second Name',
      type: ENTITY_TYPES.TEXT,
      id: 'user.list.1',
      edit: false,
    },
    {
      fieldName: 'Third Name',
      type: ENTITY_TYPES.TEXT,
      id: 'user.list.2',
      edit: false,
    },
  ])

  const handleEntityAction = (action, entity) => {
    let newList = entityList;
    switch (action) {
      case 'DELETE':
        //delete entity
        newList = newList.filter(item => item.id !== entity.id)
        break
      case 'TOGGLE_EDIT':
        // Toggle edit parameter
        newList[newList.findIndex(item => item.id === entity.id)] = entity
        break
      case 'UPDATE_TITLE':
        //update title
        newList[newList.findIndex(item => item.id === entity.id)] = entity
        break
    }
    setEntityList(newList)
  }

  const handleEntitySideBarItemClick = (type) => {
    const itemID = `user.list.${entityList.length}`
    const newItem = {
      fieldName: '',
      type: ENTITY_TYPES[type],
      id: itemID,
      edit: true
    }

    setEntityList(list => [...list, newItem])
  }

  const handleSaveClick = () => {

    // check if any field is in edit mode
    entityList.forEach((item, idx) => {
      if (item.edit == true) {
        alert('Please save all field names!')
        return
      }
    })

    // Save the entityList to the database and create a new table definition

  }

  return (
    // <Sidebar/>
    <PageParent sx={{ flexDirection: 'row', backgroundColor: '#f6f6f6' }}>
      <EntityTypeSidebar handleClick={handleEntitySideBarItemClick} />
      <FlexBox column sx={{
        alignItems: 'flex-start'
      }}>
        <Button variant='outlined'>+ Create Entity</Button>

        {entityList.map((item, idx) => {
          return (
            <EntityItem
              key={idx}
              handleAction={handleEntityAction}
              item={item}
            />
          )
        })}

        <Button variant='contained' onClick={handleSaveClick} >Save</Button>

      </FlexBox>

    </PageParent>

  )
}

export default Dashboard