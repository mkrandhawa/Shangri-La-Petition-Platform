const dotenv = require('dotenv');
const mongoose =  require('mongoose');
const app = require('./app')

dotenv.config({path: './config.env'});

const port = process.env.PORT;
const DB = process.env.DATABASE;

mongoose.connect(DB)
        .then(()=>console.log('DB connection successful'))
        .catch((err)=>console.log('Error connecting to the database', err));

const server = app.listen(port, 'localhose', ()=>{
    console.log(`Listening on port ${port}`);
})