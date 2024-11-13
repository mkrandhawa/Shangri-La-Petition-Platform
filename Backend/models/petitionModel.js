const mongoose = require('mongoose');

const petitionSchema = mongoose.Schema({
    status:{
        type: String,
        enum:['open', 'closed'],
        default: 'open',
        required: true
    },
    title:{
        type: String,
        required: [true, 'Please provide a title']
    },
    text:{
        type: String,
        required: [true, 'Please provide a valid description']
    },
    signatures:{
        type: Number,
        min: undefined,
    },
    response:{
        type: String,
        
    },
    petitioner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

});

const Petition = mongoose.model('Petition', petitionSchema);

module.exports = Petition;
