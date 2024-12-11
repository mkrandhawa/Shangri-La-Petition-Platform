const Petition = require('../models/petitionModel');
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

// Sign a Petition --> /api/petitions/:petitionId/sign

exports.signPetition = async(req, res, next)=>{

    const userId = req.user.id;

    const petitionId = req.params.petitionId;

    // If there is not petition ID or if the user is no Logged in --> ERROR

    if(!userId || !petitionId){

        next(res.status(400).json({
            status: 'Fail',
            message: 'Please login/provide valid petition ID'
        }));
    }

    const petition = await Petiton.findById(petitionId);

    const user = await  User.findById(userId);

    const petitionSigned = user.signedPetitions.includes(petitionId);

    const youCreatedPetition = user.createdPetitions.includes(petitionId);

    // If the petition has not been signed before and logged user has role 'user' --> Continue Signing

    if(!petitionSigned && !youCreatedPetition && petition && user.role === 'petitioner'){

        //Update the references to the petition document

        const updated = await User.updateOne(
            {_id: userId},
            {$push:{
                signedPetitions: petitionId
            }}, 
            {new: true}
        );

        // Increase the signs for the petition

        await Petition.updateOne(
            {_id: petitionId}, 
            {$inc:{
                countSigns: 1
            }}
        );

        res.status(200).json({
            staus: 'Success',
            message: 'You have signed successfully',
            data: updated
        });
    
    }else{
        next(res.status(400).json({
            status: 'Fail',
            message: 'You cannot sign the same petition twice/You cannot sign your own petition'
        }))
    }

}

// Set Threshold --> '/api/user/commitee/threshold

exports.setThreshold = async(req, res, next)=>{

    const userId = req.user.id;

    const petitionId = req.params.petitionId;

    const minSign = req.body.minSign;


    if(!userId || !petitionId){
        next(res.status(400).json({
            status: 'Fail',
            message: 'Wrong petition ID/ Not logged in'
        }));
    }

    const user = await User.findById(userId);

    if(user.role === 'admin'){

        const updateSigns = await Petition.updateOne(
            {_id: petitionId},
            {minSign: minSign}, {new: true});

        // The message will not printed as the code is 204 
        res.status(204).json({
            staus: 'Success',
            message: 'Updated minimum sign required',
            data: updateSigns
            
        });
    }else{
        
        next(res.status(401).json({
            status: 'Fail',
            message: 'You do not have the permission to sign'
        }));
    }

}

