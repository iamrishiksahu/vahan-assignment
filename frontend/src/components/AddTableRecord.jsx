import { Box, Button, IconButton, Switch, TableCell, TableRow, TextField } from '@mui/material'
import React from 'react'
import { axiosInstance } from '../../config/axiosConfig'
import { FlexBox } from './uiElements/AllContainers'

const AddTableRecord = ({ columns, data, editMode, handleDone }) => {

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if (editMode) {

            const valueString = columns.map((col) => {
                if (col.type.dataType === 'TEXT' || col.type.dataType === 'CHAR(1)' || col.type.dataType === 'TIME' || col.type.dataType === 'DATE') {
                    return `${col.fieldName} = '${e.target[col.fieldName].value}'`
                } else if (col.type.dataType === 'BOOLEAN') {
                    return `${col.fieldName} = '${e.target[col.fieldName].checked}'`
                } else {
                    return `${col.fieldName} = ${e.target[col.fieldName].value}`
                }
            }).join(', ')

            console.log(valueString)
            console.log(editMode)

            try {
                const res = await axiosInstance.put(`/update-record`, {
                    tableName: data.metaData.tablename,
                    id: editMode.id,
                    valueString: valueString
                })
                handleDone(false)

            } catch (err) {
                console.log(err)

                if (err?.response?.data) {
                    alert(err.response.data.split("\n")[0])
                } else {
                    alert('Oops! Something went wrong.')

                }
            }

        } else {

            const values = columns.map((col) => {
                if (col.type.dataType === 'TEXT' || col.type.dataType === 'CHAR(1)' || col.type.dataType === 'TIME' || col.type.dataType === 'DATE') {
                    return `'${e.target[col.fieldName].value}'`
                } else if (col.type.dataType === 'BOOLEAN') {
                    return e.target[col.fieldName].checked
                } else {
                    return e.target[col.fieldName].value
                }
            }).join(',')

            const attributes = columns.map((col, idx) => {
                return col.fieldName
            }).join(',')

            console.log(values, "cols: ", attributes)
            try {
                const res = await axiosInstance.post(`/insert-record`, {
                    tableName: data.metaData.tablename,
                    columns: attributes,
                    values: values
                })
                console.log(res)
                handleDone(false)

            } catch (err) {
                console.log(err)
                if (err?.response?.data) {
                    alert(err.response.data.split("\n")[0])
                } else {
                    alert('Oops! Something went wrong.')

                }
            }
        }


    }
    return (
        <form onSubmit={handleFormSubmit} style={{ width: 'auto' }}>
            <TableRow sx={{ display: 'flex', padding: '0.25rem', position: 'relative', paddingRight: '5rem', alignItems: 'center' }}>
                {columns.map((col, idx) => (
                    <TableCell
                        key={col.id}
                        sx={{
                            fontWeight: 600,
                            color: '#444',
                            border: 'none'
                        }}
                        style={{
                            padding: '0.25rem'
                        }}

                    >{col.type.dataType === 'BOOLEAN' ?

                        <Switch name={col.fieldName} />
                        :
                        <TextField
                            type={col.type.inputType}
                            defaultValue={editMode ? editMode[col.fieldName.toLowerCase()] : ''}
                            size='small'
                            name={col.fieldName}
                            placeholder={col.fieldName}
                            label={col.type.inputType == 'date' ? null : col.fieldName}
                        />
                        }
                    </TableCell>
                ))}
                <TableCell align='center' sx={{ width: '100px', position: 'absolute', right: '0rem', border: 'none' }}>
                    <FlexBox>
                        <IconButton sx={{ color: 'var(--color-primary)' }} size='small' type='submit'>
                            <i className={'fa fa-check'}
                                style={{ cursor: 'pointer' }}
                            />
                        </IconButton>
                    </FlexBox>
                </TableCell>



            </TableRow>
        </form>
    )
}

export default AddTableRecord