const express = require('express');
const petitionController = require('../controllers/petitionController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:status?', petitionController.queryOpenPetitions);
    
router.get('/', petitionController.getAllPetitions);

router.post('/addPetition', userController.protect, petitionController.addPetition);

router.patch('/:petitionId/sign', userController.protect, petitionController.signPetition);



module.exports=router;