// const express = require('express')
const express = require('express');
const dotenv = require('dotenv').config()
const errorHandeler =require('./middleware/errorhandeler')
const contactRoute = require('./routes/contactroutes');
const userRoutes = require('./routes/userRoutes')
const connectDb = require('./config/dbConnection');


const app = express();

const port = process.env.PORT || 5000;
connectDb();
app.use(express.json())
app.use('/api/contacts',contactRoute)
app.use('/api/user',userRoutes)

app.use(errorHandeler);



app.listen(port,()=>{
    console.log('Server running port ' + port )
})

