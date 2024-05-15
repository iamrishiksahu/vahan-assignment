import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { FlexBox } from '../uiElements/AllContainers'
import { ENTITY_TYPES } from '../../utils/EntityTypes'

const EntityItem = ({ item,  handleAction }) => {

    // mode: VIEW | EDIT

    if (!item.type || !item.id) {
        const err = (!item.type ? 'Type' : 'ID') + ' is missing in the props!'
        console.log(err)
        return (<>{err}</>)
    }

    const [helperText, setHelperText] = useState(null)
    const [editMode, setEditMode] = useState(item.fieldName === "")

    const nameRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        uploadUpdateFieldName()
    }

    const uploadUpdateFieldName = () => {

        const newName = nameRef.current.value
        if (newName.length <= 0) {
            setHelperText('Please set the field name!')
            return
        }

        item.fieldName = newName
        item.edit = false

        handleAction('UPDATE_TITLE', item)
        // handleAction('TOGGLE_EDIT', item)

        // alert(nameRef.current.value)
        // setEditMode(prev => !prev)
    }

    return (
        <>
            <FlexBox sx={{
                backgroundColor: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                ":hover": {
                    boxShadow: '0 0 10px #00000008'
                }


            }}>
                <Tooltip title={item.type.name}>
                    {/* <IconButton> */}
                        <i className={ENTITY_TYPES[item.type.name].icon} />
                    {/* </IconButton> */}
                </Tooltip>
                <FlexBox sx={{ justifyContent: 'flex-start' }}>
                    {editMode ?
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='outlined'
                                name='field_name'
                                size='small'
                                inputRef={nameRef}
                                placeholder='Field Name'
                                error={helperText ? true : false}
                                onChange={() => {
                                    if (helperText != null) setHelperText(null)
                                }}
                                defaultValue={item.fieldName}
                                helperText={helperText}
                                sx={{
                                    width: '100%',
                                    padding: 0
                                }}

                            />
                        </form>
                        : <><Typography>{item.fieldName}</Typography></>}
                </FlexBox>

                {/* Actions */}
                <FlexBox sx={{ width: 'max-content' }}>
                    <i className={editMode ? 'fa fa-check' : 'fa fa-pencil'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            if (editMode) {
                                uploadUpdateFieldName()
                            }else{
                                handleAction('TOGGLE_EDIT', item)
                                // setEditMode(true)
                            }
                        }} />
                    <i className='fa fa-trash-o'
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleAction('DELETE', item)}
                    />

                </FlexBox>
            </FlexBox>


        </>
    )
}

export default EntityItem