import { Box, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { FlexBox } from '../uiElements/AllContainers'
import { ENTITY_TYPES } from '../../utils/EntityTypes'

const EntityItem = ({ edit, fieldName, type, id, handleDelete }) => {

    // mode: VIEW | EDIT

    if (!type || !id) {
        const err = (!type ? 'Type' : 'ID') + ' is missing in the props!'
        console.log(err)
        return (<>{err}</>)
    }

    const [helperText, setHelperText] = useState(null)
    const [editMode, setEditMode] = useState(edit || false)

    const nameRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const value = e.target.field_name.value
        if (value.length <= 0) {
            setHelperText('Please set the field name!')
            return
        }
    }

    const updateFieldName = () => {
        alert(nameRef.current.value)
    }

    return (
        <>
            <FlexBox>
                <i className={ENTITY_TYPES[type.name].icon} />
                <FlexBox sx={{ justifyContent: 'flex-start' }}>
                    {editMode ?
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='outlined'
                                name='field_name'
                                size='small'
                                inputRef={nameRef}
                                placeholder='Field Name'
                                // label='Field Name'
                                error={helperText ? true : false}
                                onChange={() => {
                                    if (helperText != null) setHelperText(null)
                                }}
                                defaultValue={fieldName}
                                helperText={helperText}
                                sx={{
                                    width: '100%'
                                }}

                            />
                        </form>
                        : <><Typography>{fieldName}</Typography></>}
                </FlexBox>

                {/* Actions */}
                <FlexBox sx={{ width: 'max-content' }}>
                    <i className={editMode ? 'fa fa-check' : 'fa fa-pencil'}
                        onClick={() => {
                            if (editMode) {
                                updateFieldName()
                            }
                            setEditMode(prev => !prev)
                        }} />
                    <i className='fa fa-trash-o' 
                        onClick={() => handleDelete(id)}
                    />

                </FlexBox>
            </FlexBox>


        </>
    )
}

export default EntityItem