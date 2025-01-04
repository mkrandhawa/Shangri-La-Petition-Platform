const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const petitionRoutes = require('./routes/petitionRoutes');

const app = express();
//SERVING STATIC FILES accessing the static files
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
    origin: ['http://localhost:3000', 
        'https://shangri-la-petitions-mk747.netlify.app', 
        'https://shangri-la-petitions-mk747-a15915868dc5.herokuapp.com'],
    credentials: true,
}));



app.use('/api/user', userRoutes);
app.use('/api/slpp/petitions', petitionRoutes);

module.exports = app;