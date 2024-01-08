module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn: "10m",
  },
  cookie: {
    accessToken: {
      name: "accessToken",
      options: {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.COOKIES_SECURE === "false" ? false : true,
        maxAge: 600000, //10 minutes
      },
    },
    refreshToken: {
      name: "refreshToken",
      options: {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.COOKIES_SECURE === "false" ? false : true,
        maxAge: 3600000, //60 minutes
      },
    },
  },
};
