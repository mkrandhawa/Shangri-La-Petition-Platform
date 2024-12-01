const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const petitionRoutes = require('./routes/petitionRoutes');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api/user/', userRoutes);
app.use('/api/petitions', petitionRoutes);

module.exports = app;