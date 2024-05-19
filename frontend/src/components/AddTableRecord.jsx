import { Button, TableCell, TableRow, TextField } from '@mui/material'
import React from 'react'
import { axiosInstance } from '../../config/axiosConfig'
import { FlexBox } from './uiElements/AllContainers'

const AddTableRecord = ({ columns, data, editMode, handleDone }) => {

    if (editMode) {
        //pre popuplate
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if (editMode) {

            const valueString = columns.map((col) => {
                if (col.type.dataType === 'TEXT' || col.type.dataType === 'CHAR') {
                    return `${col.fieldName} = '${e.target[col.fieldName].value}'`
                } else {
                    return `${col.fieldName} = ${e.target[col.fieldName].value}`
                }
            }).join(', ')
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
                alert('Oops! Something went wrong.')
            }

        } else {

            const values = columns.map((col) => {
                if (col.type.dataType === 'TEXT' || col.type.dataType === 'CHAR') {
                    return `'${e.target[col.fieldName].value}'`
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
                alert('Oops! Something went wrong.')
            }
        }


    }
    return (
        <form onSubmit={handleFormSubmit}>
            <TableRow>
                {columns.map((col, idx) => (
                    <TableCell
                        key={col.id}
                        sx={{
                            fontWeight: 600,
                            color: '#444'
                        }}
                    ><TextField
                            defaultValue={editMode ? editMode[col.fieldName] : ''}
                            size='small'
                            name={col.fieldName}
                            placeholder={col.fieldName}
                            label={col.fieldName}
                        />
                    </TableCell>
                ))}


                <TableCell align='center' sx={{ width: '100px' }}>
                    <FlexBox>

                        <Button type='submit'>
                            <i className={'fa fa-check'}
                                style={{ cursor: 'pointer' }}
                            />
                        </Button>
                    </FlexBox>
                </TableCell>



            </TableRow>
        </form>
    )
}

export default AddTableRecord