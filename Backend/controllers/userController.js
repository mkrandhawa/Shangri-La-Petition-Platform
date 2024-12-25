const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const data = require('../public/data/bioId');

// Generate JSON Taken

const generateJsonToken = (userId) => {

    const secret = process.env.JWT_SECRET;
    
    return jwt.sign({id: userId}, secret, {expiresIn: '30d'});

};

// Protect function

exports.protect = async(req, res, next)=>{
    let token;
    
    try{
        

        if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];

        }else if (req.cookies?.jsonToken){
            token = req.cookies.jsonToken;
        }
        
        if(!token){
            return (res.status(401).json({
                status: 'Fail',
                message: 'You are not logged in'
            }));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decodedToken.id};

        next();
        
    }catch(err){
        console.log('Error with the authorization', err.message);
    }
}


// Register User --> /api/user/signup

exports.register = async(req, res, next)=>{

    const username = req.body.email.split('@')[0];

    const {email, fullName, dob, password, confirmPassword, bioId, role } = req.body;

    const isBioId = await User.find({bioId});    
    
    const isEmail = await User.find({email});

    if(isEmail.length!=0){

        return res.status(400).json({
            status: 'Fail',
            message: 'This is not your email!'
        });
    }
    if(!isBioId.length==0){
        res.status(400).json({
            status: 'Fail',
            message: 'This BioID does not belong to you!'
        });
        return;
    }else if ( !data.includes(bioId)){
        res.status(400).json({
            status: 'Fail',
            message: 'This BioID does not exists!'
        });
        return;
    }else if (password !== confirmPassword){
        res.status(400).json({
            status: 'Fail',
            message: 'Passwords do not match'
        });
        return;
    }

    const user = await User.create({
        email,
        username,
        fullName,
        password,
        dob,
        confirmPassword,
        bioId,
        role
    });

    const token = generateJsonToken(user._id);

    res.cookie('jsonToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        sameSite: 'None'

    });

    res.status(201).json({
        status: 'success',
        data: {
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            role: user.role

        }

    })

};

// Register Admin --> /api/user/auth/signUp/admin

exports.registerAdmin = async(req, res, next)=>{

    const secretKey = req.body.secret;

    const admins = await User.exists({role: 'admin'});


    if (secretKey!= process.env.ADMIN_SECRET || admins){

        next(res.status(500).json({
            status: 'Fail',
            message: 'You do not have the permission'
        }));

        return;
    }

    const {email, password, confirmPassword} = req.body;


    const user = await User.create({
        email,
        username: 'admin',
        fullName: 'Admin',
        password,
        confirmPassword,
        role: 'admin',
        bioId: process.env.BIOID
    });



    const token = generateJsonToken(user._id);

    res.cookie('jsonToke', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'None'
    });

    res.status(200).json({
        status: 'Success',
        message: 'Registered as admin!',
        data:{ 
            email: user.email,
            username: user.username
        }
    });

}

// Login User --> /api/user/login

exports.login = async(req, res, next)=>{
    const {email, password} = req.body;
    
    if (!email || !password){
        return next(res.status(400).json({
            status: 'Fail',
            message: 'Please provide a valid email/password'
        }));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.comparePasswords(user.password, password))){
        return next(res.status(401).json({
            status: 'Fail',
            message: 'Incorrect email/password'
        }))
    }

    const token = generateJsonToken(user._id);

    res.cookie('jsonToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        sameSite: 'None'
    });

    res.status(200).json({
        status: 'Success',
        message: 'You are logged in!',
        data:{
            email: user.email,
            username: user.username,
            fullName: user.fullName,
        }
    });

}

// Logout User --> /api/user/logout

exports.logout = async(req, res, next)=>{

    res.cookie('jsonToken', '',{
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        expiresIn: new Date(0),
        sameSite: 'None'
    });

    res.status(200).json({
        status: 'Success',
        message: 'You have been logged out'
    })
}

// User Logged In --> /api/user/isLoggedIn
exports.isLoggedIn = async (req, res, next) => {
    //If there is no cookie there is no logged in user
    
    if (req.cookies.jsonToken) {
      try {
        //1)verifies the token
        const decoded = jwt.verify(
          req.cookies.jsonToken,
          process.env.JWT_SECRET
        );

  
        //2) Check if the user still exists
        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
          return next();
        }

        //THERE IS A LOGGED IN USER
        res.locals.user = freshUser;
        res.status(200).json({
            status:'success',
            message: 'The user is logged',
            jsonToken: req.cookies.jsonToken,
            data:{
                freshUser
            }
        })
        return next();
      } catch (err) {
        console.log(err);
        return next();
      }
    }
    next();
  };


