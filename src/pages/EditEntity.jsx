import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Button, Typography } from '@mui/material'
import { FlexBox, PageParent } from '../components/uiElements/AllContainers'
import AttributeTypeSidebar from '../components/AttributeTypeSidebar'
import TextEntity from '../components/entities/EntityItem'
import EntityItem from '../components/entities/EntityItem'
import { ENTITY_TYPES } from '../utils/EntityTypes'
import { useNavigate, useParams } from 'react-router-dom'

const EditEntity = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [entityData, setEntityData] = useState(null)
  const [entityList, setEntityList] = useState([])

  useEffect(() => {
    if (!id) {
      navigate('/')
    } else {

      // Fetch Entity Data

      setEntityData({
        attributeList: [{
          fieldName: 'sdf',
          type: ENTITY_TYPES['BOOLEAN'],
          id: 'sdf',
          edit: true
        }]
      })

    }
  }, [])

  useEffect(() => {
    setEntityList(entityData?.attributeList || [])
  }, [entityData])


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

    for (let i = 0; i < entityList.length; i++) {

      if (entityList[i].edit == true) {
        alert('Please save all field names!')
        break
      }
    }

    // Save the entityList to the database and create a new table definition
  }

  return (
    <PageParent sx={{
      justifyContent: 'flex-start',
      backgroundColor: '#f6f6f6',
      height: '100vh',
      overflowY: 'auto',
      padding: '2.5rem',
      paddingTop: '1rem',
      alignItems: 'flex-start'
    }}>

      <Typography
        variant='link'
        onClick={() => navigate('/')}>
        <i className='fa fa-angle-left' /> &emsp;Back
      </Typography>

      <FlexBox gap={'2.5rem'}>

        <Box sx={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <FlexBox sx={{ justifyContent: 'space-between', marginTop: '0.5rem'}}>
            <Typography variant='h3'>Entity Name</Typography>
            <Button variant='contained' onClick={handleSaveClick} >Save</Button>

          </FlexBox>


          {entityList.map((item, idx) => {
            return (
              <EntityItem
                key={idx}
                handleAction={handleEntityAction}
                item={item}
              />
            )
          })}


        </Box>

        <FlexBox column sx={{
          padding: '1rem',
          alignItems: 'flex-start',
          width: 'max-content',
          backgroundColor: 'white'
        }}>
          <AttributeTypeSidebar handleClick={handleEntitySideBarItemClick} />
        </FlexBox>

      </FlexBox>

    </PageParent >

  )
}

export default EditEntity