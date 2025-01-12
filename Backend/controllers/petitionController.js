const Petition = require('../models/petitionModel');
const User = require('../models/userModel');
const multer = require('multer');
const nodemailer = require('nodemailer');



// Nodemailer functions
const createTransporter = async () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
    });
};

const petitionClosure = async (email, response) => {
    const transporter = await createTransporter();
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Petition Closed',
        html: `
            <p>Hi!</p>

            <p>
                We wanted to inform you that your petition has been successfully closed. Thank you for your participation! 
                We also want to let you know that a reply has been received regarding your petition. You can review the response below or by logging to your account.
            </p>

            <p  style="font-style: italic; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                ${response}
            </p>

            <p>
                If you did not initiate this action or have any concerns, please contact our support team for assistance.
            </p>

            <p>
                Best wishes,<br><strong>The Petition Website Team</strong>
            </p>
            <br>

               
        `,
    };    
  
    return transporter.sendMail(mailOptions);
};

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
        const petitions = await Petition.find(query).populate('petitioner', 'fullName -_id');

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

//Add Image Helper

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/petition");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `petition${req.user.id}-${Date.now()}.${ext}`); //petition-userID-timestamp.extension
    },
});

// Filters the file/files that are being uploaded

const filter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        const err = new Error('Only .png, .jpg and .jpeg format allowed!')
        err.name = 'ExtensionError'
        return cb(err);
    }

};

// Upload function to upload the images with the max limit to be 10

const upload = multer({
    storage: multerStorage,
    limits: {fileSize: 5 * 1024 * 1024}, //5MB
    fileFilter: filter,
}).single('image');


// Add Petition --> /api/slpp/petitions/addPetition

exports.addPetition = async (req, res, next) => {
    // Handle file uploads
    upload(req, res, async (err) => {
        if (err) {
            if (err.name === "MulterError") {
                return res.status(400).json({
                    status: "Fail",
                    message: err.message || "File upload failed",
                });
            }
            return next(err); // Pass other errors to global error handler
        }

        const { title, text } = req.body;

        const user = req.user.id;

        if (!user) {
            return res.status(401).json({
                status: 'Fail',
                message: 'You must be logged in!'
            });
        }

        const petitioner = await User.findById(user);

        if (petitioner.role !== 'petitioner') {
            return res.status(401).json({
                status: "Fail",
                message: 'You do not have the permission to create a petition'
            });
        }

        // Prepare petition data
        const petitionData = {
            title,
            text,
            petitioner: user,
        };

        // Add image only if it exists
        if (req.file) {
            petitionData.image = req.file.path;
        }

        // Create petition
        const petition = await Petition.create(petitionData);

        await User.updateOne({ _id: user }, { $push: { createdPetitions: petition._id } });

        res.status(201).json({
            status: "Success",
            data: petition
        });
    });
};

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

    // If the petition has not been signed before and logged user has role 'petitioner' --> Continue Signing

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
            {
                $inc:{countSigns: 1},
                $push:{signatures: userId}
            },
        );

        res.status(200).json({
            status: 'Success',
            message: 'You have signed successfully',
            data: updated
        });
    
    }else if(youCreatedPetition){
        res.status(400).json({
            status: 'Fail',
            message: 'You cannot sign your own petition!'
        });

    }else{
        res.status(400).json({
            status: 'Fail',
            message: 'You cannot sign the same petition twice.'
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

        await Petition.updateMany(
            { status: 'open' },  
            { $set: { minSign: minSign } }  
        );
        

        res.status(200).json({
            status: 'Success',
            message: 'Updated threshold value!',
            
        });
    }else{
        
        res.status(401).json({
            status: 'Fail',
            message: 'You do not have the permission to update threshold sign'
        });
    }

};

// Respond Petition --> /api/user/admin/:petitionId/respond

exports.respondPetition = async(req, res)=>{

    try{

        const userId = req.user.id;

        const petitionId = req.params.petitionId;

        const response = req.body.response;

        const user = await User.findById(userId);

        const petition = await Petition.findById(petitionId);

        if(user.role === 'petitioner'){

            return res.status(401).json({
                status: 'Fail',
                message: 'You do not have permissions to perform this task!'
            });
        }


        // signs total < threshold and there is a response ? Throw error
        if(petition.response){
            
            return res.status(400).json({
                staus: 'Fail',
                message: 'Respose already added !!'
            });
        }

        await petition.updateOne({$set: {response, status: 'closed'}}, {new: true});

        const userPetition = await Petition.findById(petitionId).populate('petitioner', 'email');
        const email = userPetition.petitioner.email;

        const petitionLink = `http://localhost:3000/myPetitions`;

        await petitionClosure(email, userPetition.response);

        

        res.status(200).json({
            status: 'Success',
            message: 'Response added successfully'    
        });
    }catch(err){
        console.log(err.message);
    }

}

// Reached Threshold --> /api/slpp/peitions/reachedThreshold

exports.reachedThreshold = async(req, res)=>{

    try{

        const userId = req.user.id;

        const user = await User.findById(userId);


        if(user.role === 'petitioner'){

            return res.status(400).json({
                status: 'Fails',
                message: 'You do not have permissions to access this route!'

            });
        }


        //Get petitions that have the total sign matching or greater than minsign and have not been replied yet
        const petitions = await Petition.find({
            $expr: {
                $gte: ["$countSigns", "$minSign"]
            },
            response: { $exists: false },
            status: 'open'
        });
        

        if(petitions.length===0){
            
            return res.status(200).json({
                status: 'Success',
                message:'The are no petitions that have reached the threshold'
            });
        }   

        res.status(200).json({
            status: 'Success',
            message: 'There are some peititons for you to reply',
            data: petitions
        });

    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Something went wrong while getting petitions that reached the threshold'
        });
    }

}