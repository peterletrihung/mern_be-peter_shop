const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshTokenModel');
const userService = require('../services/userService');
const JwtService = require('../services/JwtService');
const { tokenBlacklist } = require('../middleware/authmiddleware');


const login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return reject(new Error('Username and password are required'));
    }
    const response = await userService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
}

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  // find in DB
  const stored = await RefreshToken.findOne({ token: refreshToken });
  if (!stored) return res.sendStatus(403);

  // verify it
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    // generate new access token
    JwtService.generalAccessToken(decoded);

    // OPTIONAL: rotate refresh token
    JwtService.generalRefreshToken(decoded);

    // delete old and save new
    await RefreshToken.deleteOne({ token: refreshToken });
    await new RefreshToken({ token: newRefreshToken, userId: decoded.userId }).save();

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  await RefreshToken.deleteOne({ token: refreshToken });
  tokenBlacklist.add(refreshToken);
  res.json({ message: 'Logged out' });
};


module.exports = {
  login,
  refresh,
  logout
}