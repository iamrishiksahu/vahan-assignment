import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import { FlexBox, GridBox, PageParent } from './uiElements/AllContainers'
import CreateEntityPopup from './CreateEntityPopup'
import EntityItem from './entities/EntityItem'
import EntityCard from './EntityCard'
import { axiosInstance } from '../../config/axiosConfig'

const DashboardMain = () => {
    const [createEntityOpen, setCreateEntityOpen] = useState(false)
    const [entityList, setEntityList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllTables = async () => {
        try {
            const res = await axiosInstance.get('/get-tables')
            console.log(res.data)
            setEntityList(res.data)
        } catch (err) {
            console.log(err)
            alert('Oops! Something went wrong!')
        }finally{
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getAllTables()
    }, [])

    return (
        <PageParent sx={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '2.5rem',
            gap: '2rem'
        }}>

            <FlexBox sx={{ justifyContent: 'space-between' }}>

                <Typography variant='h4'> Hi, Welcome Back!</Typography>

                <FlexBox sx={{ justifyContent: 'flex-end', width: 'auto' }}>
                    <Button variant='outlined'
                        target='_blank'
                        href='https://github.com/iamrishiksahu/vahan-assignment'>GitHub Repo</Button>
                    <Button variant='outlined'
                        target='_blank'
                        href='https://drive.google.com/file/d/10TkWWxTH5egzuBfRN3V5zIc98h71TfTo/view'>Video Demo</Button>
                    <Button variant='outlined'
                        target='_blank'
                        href='https://linkedin.com/in/rishiksahubit'>LinkedIn</Button>
                </FlexBox>
            </FlexBox>

            <Typography variant='h6' color={'#444'}>Recent Entities</Typography>

            <GridBox cols={4} sx={{
                width: '80vw',
                gap: '1.5rem'
            }}>

                <PageParent
                    onClick={() => setCreateEntityOpen(true)}
                    className='entity-card'
                    sx={{
                        border: '2px dashed #bcbcbc',
                        backgroundColor: 'var(--bg-main-light)'
                    }}
                >
                    <i className='fa fa-plus' style={{ color: 'var(--color-primary)' }} />
                    <Typography color={'primary'}>Create New Entity</Typography>
                </PageParent>
                {isLoading? <CircularProgress /> : entityList.reverse().map((item, idx) => {
                    return (
                        <EntityCard key={idx} entity={item} />
                    )
                })}
            </GridBox>

            <Typography variant='body'>Developed with 💓 for Vahan by Rishik Sahu.</Typography>

            {createEntityOpen && <CreateEntityPopup handleClose={setCreateEntityOpen} handleCreate={() => { }} />}
        </PageParent>

    )
}

export default DashboardMain