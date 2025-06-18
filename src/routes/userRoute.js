const express = require('express');
const router = express.Router();
// const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const userController = require('../controllers/userController');

router.post('/', userController.createUser);

// router.get('/', (req, res) => {
//   res.send('User route is working');
// });

module.exports = router;