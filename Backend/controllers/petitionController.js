const Petition = require('../models/petitionModel');
const User = require('../models/userModel');


// Get All Petitions --> /api/slpp/petitions

exports.getAllPetitions = async(req, res, next)=>{

    const petitions =  await Petition.find();

    res.status(200).json({
        staus: 'Success',
        data: petitions
    })
}

// Add Petition --> /api/slpp/petitions/addPetition

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

    const petition = await Petition.create({
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

// Sign a Petition --> /api/slpp/petitions/:petitionId/sign

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

    const petition = await Petition.findById(petitionId);

    const user = await  User.findById(userId);

    const petitionSigned = user.signedPetitions.includes(petitionId);

    const youCreatedPetition = user.createdPetitions.includes(petitionId);

    // If the petition has not been signed before and logged user has role 'user' --> Continue Signing

    if(!petitionSigned && !youCreatedPetition && petition && user.role === 'petitioner' && petition.status != 'closed'){

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

// Set Threshold --> /api/user/commitee/threshold

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

// Respond Petition --> /api/user/admin/:petitionId/respond

exports.respondPetition = async(req, res, next)=>{

    const userId = req.user.id;

    const petitionId = req.params.petitionId;

    const response = req.body.response;

    const user = await User.findById(userId);

    const petition = await Petition.findById(petitionId);

    if(user.role != 'admin'){

        return res.status(401).json({
             status: 'Fail',
             message: 'You do not have permissions to perform this task!'
        });
    }

    // signs total < threshold and there is a response ? Throw error
    if(petition.countSigns < petition.minSign || petition.response){
        
        return res.status(400).json({
            staus: 'Fail',
            message: 'Respose already added / Have not met the threshold!!'
        });
    }

    const updatedPetition = await petition.updateOne({$set: {response, status: 'closed'}}, {new: true});

    res.status(204).json({
        status: 'Success',
        message: 'Response added successfully',
        data: updatedPetition
    });

}

// Open Petitions --> /api/slpp/petitions?status=open

exports.queryOpenPetitions = async(req, res, next)=>{

    const query = req.query.status;
    let petitions;

    // If the user query is about open petitions

    if(query === 'open'){

        petitions = await Petition.find({status: query});

        // If there are no open petitions -> Send message
        if(!petitions){

            res.status(200).json({
                status: 'Success',
                message: 'There are no open petitions'
            });
        }
    
        // If there are open petitions --> Send data
        res.status(200).json({
            status: 'Success',
            message: 'Open petitions found successfully',
            data: petitions
        });

    }else{
        next(res.staus(400).json({
            status: 'Fail',
            message: 'No such query available!'
        }));
    }
}