module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn: "5m",
  },
  cookie: {
    name: "refreshToken",
    refreshTokenMaxAge: 600000, //10 minutes
  },
};
