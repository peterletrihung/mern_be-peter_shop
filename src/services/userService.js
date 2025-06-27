const User = require('../models/UserModel');
const RefreshToken = require('../models/RefreshTokenModel');
const brcypt = require('bcrypt');
const JwtService = require('./JwtService');

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { username, email, phone, password } = newUser;
    try {
      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [
          { username: username },
          { email: email },
          { phone: phone }
        ]
      });
      if (existingUser) {
        return reject(new Error('User already exists'));
      }

      const hashedPassword = await brcypt.hash(password, 10);
      const createdUser = await User.create({
        username: username,
        email: email,
        phone: phone,
        password: hashedPassword,
        isAdmin: false,
        access_token: null,
        refresh_token: null
      });
      if (!createdUser) {
        return reject(new Error('User creation failed'));
      }
      resolve({
        status: 'OK',
        message: 'User created successfully',
        data: createdUser
      });
    } catch (error) {
      reject(error);
    }
  });
}

const loginUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const { username, password } = user;
    try {
      const existingUser = await User.findOne({ username: username });
      if (!existingUser) {
        return reject(new Error('User not found'));
      }
      const isPasswordMatch = await brcypt.compareSync(password, existingUser.password);
      if (!isPasswordMatch) {
        return reject(new Error('Invalid password'));
      }

      const accessToken = JwtService.generalAccessToken({ id: existingUser.id, isAdmin: existingUser.isAdmin });
      const refreshToken = JwtService.generalRefreshToken({ id: existingUser.id, isAdmin: existingUser.isAdmin });
      existingUser.access_token = accessToken;
      existingUser.refresh_token = refreshToken;
      await existingUser.save();

      // save refresh token in DB
      await new RefreshToken({ token: refreshToken, userId: existingUser.id }).save();

      resolve({
        status: 'OK',
        message: 'User logged in successfully',
        data: existingUser
      });
    } catch (error) {
      reject(error);
    }
  });
}

const updateUser = (id, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
      if (!updatedUser) {
        return reject(new Error('User not found'));
      }
      resolve({
        status: 'OK',
        message: 'User updated successfully',
        data: updatedUser
      });
    } catch (error) {
      reject(error);
    }
  });
}

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const deletedUser = await User.findByIdAndDelete(id);
      // if (!deletedUser) {
      //   return reject(new Error('User not found'));
      // }
      resolve({
        status: 'OK',
        message: 'User deleted successfully',
        // data: deletedUser
      });
    } catch (error) {
      reject(error);
    }
  });
}

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find();
      resolve({
        status: 'OK',
        message: 'Users fetched successfully',
        data: users
      });
    } catch (error) {
      reject(error);
    }
  });
}

const getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return reject(new Error('User not found'));
      }
      resolve({
        status: 'OK',
        message: 'User fetched successfully',
        data: user
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById
};