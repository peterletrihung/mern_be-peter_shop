const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authmiddleware');

router.post('/sign-up', userController.createUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/get-all-users', authMiddleware, userController.getAllUsers);
router.get('/detail-user/:id', authMiddleware, userController.getUserById);

module.exports = router;