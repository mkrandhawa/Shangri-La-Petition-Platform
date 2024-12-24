const express = require('express');
const userController = require('../controllers/userController');
const petitionController = require('../controllers/petitionController');

const router = express.Router();

router.get('/auth/isLoggedIn', userController.isLoggedIn);

router.post('/auth/signup', userController.register);

router.post('/auth/admin/signUp', userController.registerAdmin);

router.post('/auth/login', userController.login);

router.post('/auth/logout', userController.logout);

router.patch('/commitee/threshold', userController.protect, petitionController.setThreshold);

router.patch('/admin/:petitionId/respond', userController.protect, petitionController.respondPetition);



module.exports = router;