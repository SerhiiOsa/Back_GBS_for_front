module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn: "10m",
  },
  cookie: {
    name: "refreshToken",
    options: {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 3600000, //60 minutes
    },
  },
};
