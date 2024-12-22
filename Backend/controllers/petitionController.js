const Petition = require('../models/petitionModel');
const User = require('../models/userModel');


// Get All Petitions --> /api/slpp/petitions

exports.getAllPetitions = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Ensure the user is logged in
        if (!userId) {
            return res.status(401).json({
                status: 'Fail',
                message: 'You have to login first!',
            });
        }

        // Check for the `status` query parameter
        const { status } = req.query;

        // Build query dynamically
        const query = {};
        if (status) {
            query.status = status; // Add `status` filter if provided
        }

        // Fetch petitions based on the query
        const petitions = await Petition.find(query);

        // Check if no petitions are found
        if (petitions.length === 0) {
            return res.status(200).json({
                status: 'Success',
                message: status
                    ? `No petitions found with status: ${status}.`
                    : 'No petitions found.',
                data: [],
            });
        }

        // Return the petitions
        return res.status(200).json({
            status: 'Success',
            message: status
                ? `Petitions with status ${status} retrieved successfully.`
                : 'All petitions retrieved successfully.',
            data: petitions,
        });
    } catch (err) {
        // Handle unexpected errors
        next(err);
    }
};


// Add Petition --> /api/slpp/petitions/addPetition

exports.addPetition = async(req, res, next)=>{

    const {status, title, text} = req.body;

    const user = req.user.id;

    if(!user){
        res.staus(401).json({
            status: 'Fail',
            message: 'You must be logged in!'
        });
    }

    const petitioner = await User.findById(user);


    if (!petitioner.role === 'petitioner'){
        res.status(401).json({
            status: "Fail",
            message: 'You do not have the permisison to create a petition'
        });
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

        res.status(400).json({
            status: 'Fail',
            message: 'Please login/provide valid petition ID'
        });
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
        res.status(400).json({
            status: 'Fail',
            message: 'You cannot sign the same petition twice/You cannot sign your own petition'
        });
    }

};

// Set Threshold --> /api/user/commitee/threshold

exports.setThreshold = async(req, res, next)=>{

    const userId = req.user.id;

    const minSign = req.body.minSign;


    if(!userId ){
        res.status(400).json({
            status: 'Fail',
            message: 'Not logged in'
        });
    }

    const user = await User.findById(userId);

    if(user.role === 'admin'){

        const updateSigns = await Petition.updateMany({minSign, new: true});

        // The message will not printed as the code is 204 
        res.status(204).json({
            staus: 'Success',
            message: 'Updated minimum sign required',
            data: updateSigns
            
        });
    }else{
        
        res.status(401).json({
            status: 'Fail',
            message: 'You do not have the permission to update threshold sign'
        });
    }

};

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
