const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const data = require('../public/data/bioId');

//Generate JSON Taken

const generateJsonToken = (userId) => {

    const secret = process.env.JWT_SECRET;
    
    return jwt.sign({id: userId}, secret, {expiresIn: '30d'});

};

//Register User

exports.register = async(req, res, next)=>{

    const username = req.body.email.split('@')[0];

    const {email, fullName, password, confirmPassword, bioId, role } = req.body;

    const isBioId = await User.find({bioId});
    
    if(!isBioId.length==0){
        res.status(400).json({
            status: 'Fail',
            message: 'This is not your Bio ID!'
        });
        return;
    }else if ( !data.includes(bioId)){
        res.status(400).json({
            status: 'Fail',
            message: 'Invalid Bio ID! Check and try again'
        });
        return;
    }

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

//Login User

exports.login = async(req, res, next)=>{
    const {email, password, bioId} = req.body;
    
    if (!email || !password || !bioId){
        return next(res.status(400).json({
            status: 'Fail',
            message: 'Please provide a valid email/password/bioId'
        }));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.comparePasswords(user.password, password)) || !(await user.compareBioId(user.bioId, bioId))){
        return next(res.status(401).json({
            status: 'Fail',
            message: 'Incorrect email/password/bioId'
        }))
    }

    const token = generateJsonToken(user._id);

    res.cookie('jsonToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
        status: 'Success',
        message: 'You are logged in!'
    });

}

//Logout User

exports.logout = async(req, res, next)=>{

    res.cookie('jsonToken', '',{
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        expiresIn: new Date(0)
    });

    res.status(200).json({
        status: 'Success',
        message: 'You have been logged out'
    })
}