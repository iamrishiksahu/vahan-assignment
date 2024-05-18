import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Button, TextField, Typography } from '@mui/material'
import { FlexBox, PageParent } from '../components/uiElements/AllContainers'
import AttributeTypeSidebar from '../components/AttributeTypeSidebar'
import TextEntity from '../components/entities/EntityItem'
import EntityItem from '../components/entities/EntityItem'
import { ENTITY_TYPES } from '../utils/EntityTypes'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosConfig'

const EditEntity = () => {

  const { name } = useParams()
  const tableNameRef = useRef()
  const navigate = useNavigate()

  const [entityList, setEntityList] = useState([])

  useEffect(() => {
    if (!name) {
      navigate('/')
    }
  }, [])


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
    const itemID = `${name}-${entityList.length}-${ENTITY_TYPES[type].name}`
    const newItem = {
      fieldName: '',
      type: ENTITY_TYPES[type],
      id: itemID,
      edit: true
    }

    setEntityList(list => [...list, newItem])
  }

  const handleSaveClick = async () => {

    // check if any field is in edit mode

    for (let i = 0; i < entityList.length; i++) {
      if (entityList[i].edit == true) {
        alert('Please save all field names!')
        return
      }
    }

    try {

      const res = await axiosInstance.post('/create-table', {
        table: tableNameRef.current.value,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        attributes: entityList
      })

      if(res.status === 201){
        alert('Table definition created successfully!')
        navigate('/')
      }

    } catch (err) {

      if (err?.response?.status == 409) {
        return alert('This table name already exists! Please change the table name.')
      }
      alert('Oops! Something went wrong.')
      console.log(err)
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
          <FlexBox sx={{ justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <TextField
              // sx={{ backgroundColor: 'white' }}
              variant='standard'
              size='small'
              defaultValue={name}
              inputRef={tableNameRef} />
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