import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FlexBox } from './uiElements/AllContainers';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import AddTableRecord from './AddTableRecord';
import { axiosInstance } from '../../config/axiosConfig';


export default function BasicRecordsTable({ name, data, fetchRecords }) {

    const records = data?.records || []
    const columns = JSON.parse(data?.metaData?.attributes)
    console.log(columns)

    const [isAddRecord, setIsAddRecord] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const handleRowItemDelete = async (id) => {
        try {
            const res = await axiosInstance.delete('/delete-record', {
                data: {
                    id: id,
                    tableName: name
                }
            })
            fetchRecords(data.metaData.tablename)
        } catch (err) {
            console.log(err)
            alert('Something went wrong.')
        }


    }

    const handleDone = () => {
        setEditMode(false)
        setIsAddRecord(false)
        fetchRecords(data.metaData.tablename)
    }

    return (
        <>

            <FlexBox sx={{
                justifyContent: 'space-between',
                padding: '1rem 1rem',
                backgroundColor: 'white',
                borderRadius: '0.25rem',
            }}>
                <Typography variant='h4' textAlign={'left'}>{name}</Typography>
                <Button variant='contained'
                    sx={{
                        backgroundColor: isAddRecord || editMode ? 'orange' : ''
                    }}
                    onClick={() => {
                        if (isAddRecord || editMode) {
                            handleDone()
                        } else {
                            setIsAddRecord(true)
                        }
                    }}>{(isAddRecord || editMode) ? 'Cancel' : '+ Add'}</Button>
            </FlexBox>
            <TableContainer component={Paper}>

                {isAddRecord || editMode ?
                    <AddTableRecord
                        columns={columns}
                        data={data}
                        editMode={editMode}
                        handleDone={handleDone} />
                    : <></>}

                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((item, idx) => (
                                <TableCell
                                    key={item.id}
                                    sx={{
                                        // minWidth: '200px',
                                        fontWeight: 600,
                                        color: '#444'
                                    }}
                                >{item.fieldName}</TableCell>
                            ))}

                            <TableCell
                                key={'actions'}
                                width={'100px'}
                                sx={{
                                    fontWeight: 600,
                                    color: '#444'
                                }}
                            >Actions</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>


                        {records.length > 0 ? records.reverse().map((row, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {columns.map((col, idx) => {
                                    const val = row[col.fieldName.toLowerCase()]
                                    return (
                                        <TableCell
                                            key={idx}
                                        >{col.type.dataType === 'BOOLEAN' ?
                                            val === true ? 'True' : 'False'
                                            : col.type.dataType === 'DATE' ?
                                                val.slice(0, 10)
                                                : col.type.name === 'PASSWORD' ? '***' : val}</TableCell>
                                    )
                                })}
                                {/* Actions */}
                                <TableCell>
                                    <FlexBox sx={{ width: 'max-content' }}>
                                        <i className={editMode?.id === row.id ? '' : 'fa fa-pencil'}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                if (editMode) {

                                                } else {
                                                    setEditMode(row)
                                                }
                                            }}
                                        />
                                        <i className='fa fa-trash-o'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleRowItemDelete(row.id)}
                                        />

                                    </FlexBox>
                                </TableCell>

                            </TableRow>
                        )) :
                            <FlexBox column sx={{
                                backgroundColor: 'white',
                                height: '10rem',
                                borderRadius: '0.5rem'
                            }}>

                                <Typography align='center' width={'100%'}>You do not have any data in the table yet!</Typography>
                                <Typography align='center' variant='body2' width={'100%'} color={'#444'}>Add data to the table using the +Add button at the top.</Typography>
                            </FlexBox>}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}