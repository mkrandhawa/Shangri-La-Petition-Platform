const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const petitionRoutes = require('./routes/petitionRoutes');

const app = express();

app.use(cookieParser());

app.use(express.json());

    
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));



app.use('/api/user', userRoutes);
app.use('/api/slpp/petitions', petitionRoutes);

module.exports = app;