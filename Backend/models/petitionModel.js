const mongoose = require('mongoose');

const petitionSchema = mongoose.Schema({
    status:{
        type: String,
        enum:['open', 'closed'],
        default: 'open'
    },
    title:{
        type: String,
        required: [true, 'Please provide a title']
    },
    text:{
        type: String,
        required: [true, 'Please provide a valid description']
    },
    signatures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    minSign: {
        type: Number,
        min: 1,
        required: true,
        default: 1, 
    },
    countSigns: {
        type: Number,
        min: 0,
        default: 0,
    },
    response:{
        type: String,
    },
    petitioner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A petition must have a petitioner']
    },
    },
    { timestamps: true } 
);

const Petition = mongoose.model('Petition', petitionSchema);

module.exports = Petition;
