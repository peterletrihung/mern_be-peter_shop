const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    if (!req.body || !req.body.name || !req.body.email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    await userService.createUser(req.body);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}

module.exports = {
  createUser,
  // getAllUsers,
  // getUserById,
  // updateUser,
  // deleteUser
};