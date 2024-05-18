const express = require('express');
const router = express.Router()

const rootRouer = (app) => {

    app.use('/', router.get('/', (req, res) => {
        res.status(200).send("Hello, Welcome to Vahan's assignment's Backend Server! I am happy to serve anything that you need.")
    }))
    
    app.use('/api', require('./apiRoutes'))

    app.use('*', (req, res) => {
        res.status(404).send('404: The resource you are looking for is not found!')
    })
}



module.exports = rootRouer