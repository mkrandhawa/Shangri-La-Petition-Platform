const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const generateJsonToken = (userId) => {

    const secret = process.env.JWT_SECRET;
    
    return jwt.sign({id: userId}, secret, {expiresIn: '30d'});

};


exports.register = async(req, res)=>{

    const username = req.body.email.split('@')[0];

    const {email, fullName, password, confirmPassword, bioId, role } = req.body;

    const user = await User.create({
        email,
        username,
        fullName,
        password,
        dob:{
            day: req.body.dob.day,
            month: req.body.dob.month,
            year: req.body.dob.year
        },
        confirmPassword,
        bioId,
        role
    });

    const token = generateJsonToken(user._id);

    res.cookie('jsonToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        maxAge: 30 * 24 * 60 * 60 * 1000, 

    })

    res.status(201).json({
        status: 'success',
        data: {
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            role: user.role,
            bioId: user.bioId

        }

    })

};