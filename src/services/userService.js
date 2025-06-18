const createUser = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve({
        message: 'User created successfully',
        user: {
          id: 1,
          name: 'John Doe',
          email: 'n5HtO@example.com',
          phone: '123-456-7890',
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  createUser,
  // getAllUsers,
  // getUserById,
  // updateUser,
  // deleteUser
};