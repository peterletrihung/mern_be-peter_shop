const jwt = require('jsonwebtoken');

const generalAccessToken = (payload) => {
  const accessToken = jwt.sign({
      payload
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } // 30s, 15m, 1h
  );
  return accessToken;
}

const generalRefreshToken = (payload) => {
  const refreshToken = jwt.sign({
      payload
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  return refreshToken;
}

module.exports = {
  generalAccessToken,
  generalRefreshToken
}

