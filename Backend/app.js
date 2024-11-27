const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use('/api/user/', userRoutes);

module.exports = app;