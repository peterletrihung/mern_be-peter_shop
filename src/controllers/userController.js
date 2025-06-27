const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }
    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) {
      return reject(new Error('Username, email, phone, and password are required'));
    }
    const response = await userService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}

const updateUser = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }
    const { id } = req.params;
    if (!id) {
      return reject(new Error('User ID is required'));
    }
    const response = await userService.updateUser(id, body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return reject(new Error('User ID is required'));
    }
    const response = await userService.deleteUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting all users', error: error.message });
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return reject(new Error('User ID is required'));
    }
    const response = await userService.getUserById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting user by ID', error: error.message });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById
};