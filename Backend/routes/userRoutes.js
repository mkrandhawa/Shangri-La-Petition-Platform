const express = require('express');
const userController = require('../controllers/userController');
const petitionController = require('../controllers/petitionController');
const router = express.Router();

router.post('/auth/signup', userController.register);
router.post('/auth/admin/signUp', userController.registerAdmin);
router.post('/auth/login', userController.login);
router.post('/auth/logout', userController.logout);
router.patch('/commitee/:petitionId/threshold', userController.protect, petitionController.setThreshold);



module.exports = router;