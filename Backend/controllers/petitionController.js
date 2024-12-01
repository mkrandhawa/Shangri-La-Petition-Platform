const Petiton = require('../models/petitionModel');
const User = require('../models/userModel');


// Get All Petitions --> /api/petitions

exports.getAllPetitions = async(req, res, next)=>{

    const petitions =  await Petiton.find();

    res.status(200).json({
        staus: 'Success',
        data: petitions
    })
}

// Add Petition --> /api/petitions/addPetition

exports.addPetition = async(req, res, next)=>{

    const {status, title, text} = req.body;

    const user = req.user.id;
    console.log(user);

    if(!user){
        next(res.staus(401).json({
            status: 'Fail',
            message: 'You must be logged in!'
        }))
    }

    const petitioner = await User.findById(user);


    if (!petitioner.role === 'petitioner'){
        next( res.status(401).json({
            status: "Fail",
            message: 'You do not have the permisison to create a petition'
        }));
    }

    const petition = await Petiton.create({
        status,
        title,
        text,
        petitioner
    });

    await User.updateOne({_id:user}, {$push: {createdPetitions : petition._id}});

    res.status(201).json({
        status: "Success",
        data: petition
    });
}

