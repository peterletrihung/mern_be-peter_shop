const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Example in-memory blacklist (for dev/testing)
const tokenBlacklist = new Set();

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' });
  }

  const accessToken = header.split(' ')[1];

  if (tokenBlacklist.has(accessToken)) {
    return res.status(401).json({ message: 'Token has been revoked' });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // if expired, signal client to refresh
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'TokenExpired' });
      }
      console.log(err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { payload } = user;
    if (!payload.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authMiddleware,
  tokenBlacklist
}