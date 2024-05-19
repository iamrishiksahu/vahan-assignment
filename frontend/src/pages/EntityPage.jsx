import React, { useEffect, useState } from 'react'
import { Box, Button, List, Typography } from '@mui/material'
import { FlexBox, PageParent } from '../components/uiElements/AllContainers'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosConfig'
import BasicRecordsTable from '../components/BasicRecordsTable'

const EntityPage = () => {

  const { name } = useParams()
  const navigate = useNavigate()

  // const [entityData, setEntityData] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [columns, setColumns] = useState(null)
  const [entityList, setEntityList] = useState([])

  const getTableDataWithRecords = async (tableName) => {

    try {

      const res = await axiosInstance.get(`/get-table-data/${tableName}`)

      console.log(res.data.records)
      setTableData(res.data)

    } catch (err) {
      console.log(err)
      alert('Oops! Something went wong loading the table data.')
      navigate('/')
    }

  }

  useEffect(() => {
    if (!name) {
      navigate('/')
    } else {
      getTableDataWithRecords(name)
    }
  }, [])

  useEffect(() => {

    if (tableData?.metaData?.attributes) {
      const attributes = JSON.parse(tableData.metaData.attributes)
      setColumns(attributes)

    }

  }, [tableData])


  const deleteEntity = async () => {
    if (confirm(`Are you sure to delete ${name} table?`)) {
      try {
        const res = await axiosInstance.delete('/delete-table', { data: { data: name } })
        if (res.status === 200) {
          alert('Table deleted successfully!')
          navigate('/')
        }
      } catch (err) {
        console.log(err)
        if (err?.response?.data === 'DropErrorMsgNonExistent') {
          alert('Table already deleted or does not exist anymore!')
          return navigate('/')
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

          {tableData !== null ?
            <BasicRecordsTable
              name={name}
              data={tableData}
              fetchRecords={getTableDataWithRecords} />
            : <></>}

        </Box>

        <FlexBox column sx={{
          padding: '2rem',
          borderRadius: '0.25rem',
          alignItems: 'flex-start',
          width: 'max-content',
          backgroundColor: 'white',
          width: '25rem'
        }}>

          <Typography variant='h6'>Table Definition</Typography>

          <List>
            {columns ? columns.map((item, idx) => (

              <Typography key={idx} padding={'0.25rem 0'}>
                {item.fieldName}: &emsp;
                {/* <span style={{ color: '#adadad' }}>{item.type.name}</span> • */}
                <span style={{ color: '#adadad' }}>{item.type.dataType}</span>
              </Typography>
            )) : <></>}

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