const express = require('express');
const router = express.Router();
const petitionController = require('../controllers/petitionController');
const userController = require('../controllers/userController');

router.get('/', petitionController.getAllPetitions);
router.post('/addPetition', userController.protect, petitionController.addPetition);
router.patch('/:petitionId/sign', userController.protect, petitionController.signPetition);

module.exports=router;