const mongoose = require('mongoose');
const validator = require('validator');
const argon2 = require('argon2');

const userSchema = mongoose.Schema({
    image:{
        type: String,
        default: 'user/userIcon.svg'
    },
    email:{
        type: String,
        required: [true, 'Please enter a valid email'],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    username:{
        type: String,
        required: true,
        lowercase: true
    },
    fullName:{
        type: String,
        required: [true, 'Please enter your full name'],
        minlength: 2
    },
    dob:{
        type: Date,
        required: [true, 'Please provide a valid DOB']
    },
    password:{
        type:String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        select: false
    },
    confirmPassword:{
        type: String,
        required: [true, 'Please confirm your password'],
        select: false,
        validate: {
            validator: function(el){
                return el === this.password
            }
        },
        message: 'Password does not match'
    },
    bioId:{
        type: String,
        required:[true, 'Please enter a valid Biometric ID'],
        unique: true,
        select: false
    },
    role:{
        type: String,
        required:true,
        enum: ['petitioner', 'admin'],
        default: 'petitioner'
    },
    createdPetitions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Petition',
    }],
    signedPetitions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Petition',
    }],

});

//Encrypting the password before saving

userSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next();

    try{
        this.password = await argon2.hash(this.password);

        this.confirmPassword = undefined;
        next();

    }catch(err){
        console.log('Error hashing the password', err.message);

    }
})

//Comparing the passwords
userSchema.methods.comparePasswords = async function(hashedPassword, userPassword){
    try{

        return  await argon2.verify(hashedPassword, userPassword);

    }catch(err){
        console.log('Error comparing the passwords', err.message)
    }
}



const User = mongoose.model('User', userSchema);

module.exports = User;