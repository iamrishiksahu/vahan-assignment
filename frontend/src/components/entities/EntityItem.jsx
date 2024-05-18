import { Box, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { FlexBox } from '../uiElements/AllContainers'
import { ENTITY_TYPES } from '../../utils/EntityTypes'
import EntityIconContainer from '../uiElements/EntityIconContainer'

const EntityItem = ({ item, handleAction }) => {

    if (!item.type || !item.id) {
        const err = (!item.type ? 'Type' : 'ID') + ' is missing in the props!'
        return (<>{err}</>)
    }

    const [helperText, setHelperText] = useState(null)
    const [editMode, setEditMode] = useState(item.fieldName === "")

    const nameRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        uploadUpdateFieldName()

    }

    const isFieldNameValid = (newName) => {
        const notStartingWithNumber = RegExp("^[0-9]")
        const aplhaNumericWithUnderscore = RegExp("^[A-Za-z0-9_]+$")

        if (newName.length <= 0) {
            setHelperText('Please set the field name!')
            return false
        } else if (newName.includes(' ')) {
            setHelperText('Space is not allowed!')
            return false
        } else if (notStartingWithNumber.test(newName)) {
            setHelperText('Cannot start with a number!')
            return false
        } else if (!aplhaNumericWithUnderscore.test(newName)) {
            setHelperText('Special characters are not allowed except "_"!')
            return false
        }else{
            return true
        }
    }

    const uploadUpdateFieldName = () => {
        
        const newName = nameRef.current.value

        if(!isFieldNameValid(newName)){
            return
        }

        item.fieldName = newName
        item.edit = false

        handleAction('UPDATE_TITLE', item)
        setEditMode(false)
    }

    const closeEditMode = () => {
        uploadUpdateFieldName()
    }
    const openEditMode = () => {
        handleAction('TOGGLE_EDIT', { ...item, edit: true })
        setEditMode(true)
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

                    <EntityIconContainer icon={item.type.icon} color={item.type.primary} bgColor={item.type.secondary} />

                </Tooltip>
                <FlexBox sx={{ justifyContent: 'flex-start' }}>
                    {/* <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        variant='standard'
                        disabled={!editMode}
                        sx={{width: '6rem'}}
                        // value={age}
                        // onChange={handleChange}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */}
                    {editMode ?
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='outlined'
                                name='field_name'
                                size='small'
                                inputRef={nameRef}
                                placeholder='Field Name'
                                autoFocus
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
                        : <><Typography sx={{ padding: '0.5rem 0' }}>{item.fieldName}</Typography></>}


                </FlexBox>

                {/* Actions */}
                <FlexBox sx={{ width: 'max-content' }}>


                    <i className={editMode ? 'fa fa-check' : 'fa fa-pencil'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            if (editMode) {
                                closeEditMode()
                            } else {
                                openEditMode()

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