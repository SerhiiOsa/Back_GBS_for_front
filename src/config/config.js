module.exports = {
  bcrypt: { saltRounds: 10 },

  defaultPagination: {
    page: 1,
    pageSize: 50,
  },

  corsOptions: {
    credentials: true,
    origin: "https://guide.intita.com",
  },
};
