require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const corsOption = require('./config/corsConfig')
const cors = require('cors');

const PORT =  process.env.PORT|| 4000;

// setting up cors
app.use(cors(corsOption));

app.use(cors(corsOption));


app.use(express.json());
app.use(express.urlencoded({extended: false}));

//setting up all root routes
require('./routes/root.js')(app);

//error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})
