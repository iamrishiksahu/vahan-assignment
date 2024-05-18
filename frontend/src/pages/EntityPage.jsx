import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Button, List, Typography } from '@mui/material'
import { FlexBox, PageParent } from '../components/uiElements/AllContainers'
import AttributeTypeSidebar from '../components/AttributeTypeSidebar'
import TextEntity from '../components/entities/EntityItem'
import EntityItem from '../components/entities/EntityItem'
import { ENTITY_TYPES } from '../utils/EntityTypes'
import { useNavigate, useParams } from 'react-router-dom'
import RecordsTable from '../components/RecordsTable'
import { axiosInstance } from '../../config/axiosConfig'

const EntityPage = () => {

  const { name } = useParams()
  const navigate = useNavigate()

  const [entityData, setEntityData] = useState(null)
  const [entityList, setEntityList] = useState([])

  useEffect(() => {
    if (!name) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    setEntityList(entityData?.attributeList || [])
  }, [entityData])








  const deleteEntity = async () => {
    if (confirm(`Are you sure to delete ${name} table?`)) {
      try {
        const res = await axiosInstance.delete('/delete-table', {data:{ data: name }})
        if (res.status === 200) {
          alert('Table deleted successfully!')
          navigate('/')
        }
      } catch (err) {
        console.log(err)
        if(err?.response?.data === 'DropErrorMsgNonExistent'){
          return alert('Table already deleted or does not exist anymore!')
        }
        alert('Oops! Something went wrong.')
      }
    } else {
      console.log('Do not delete the table');

    }
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
      alignItems: 'flex-start',
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

      <FlexBox gap={'2.5rem'} alignItems={'flex-start'}>

        <Box sx={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>

          <RecordsTable name={name} />
          {/* <FlexBox sx={{ justifyContent: 'space-between', marginTop: '0.5rem'}}>
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
          })} */}


        </Box>

        <FlexBox column sx={{
          padding: '1rem',
          alignItems: 'flex-start',
          width: 'max-content',
          backgroundColor: 'white',
          width: '25rem'
        }}>

          <Typography variant='h6'>Table Definition</Typography>

          <List>

            <Typography>Name : <span style={{ color: '#adadad' }}>String</span></Typography>
            <Typography>Name : <span style={{ color: '#adadad' }}>String</span></Typography>
            <Typography>Name : <span style={{ color: '#adadad' }}>String</span></Typography>
            <Typography>Name : <span style={{ color: '#adadad' }}>String</span></Typography>

          </List>

          <Button variant='outlined'
            onClick={deleteEntity}
            sx={{
              color: 'red',
              borderColor: 'red',
              width: '100%',

            }}>
            <i style={{
              color: 'red',
            }} className='fa fa-trash-o' />
            &emsp;
            DELETE TABLE
          </Button>

        </FlexBox>

      </FlexBox>

    </PageParent >

  )
}

export default EntityPage