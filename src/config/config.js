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

  vacancies: {
    joobleAPI: {
      url: "https://ua.jooble.org/api/",
      key: process.env.JOOBLE_API_KEY,
      params: {
        keywords: "IT",
        location: "Україна",
        page: 1,
        ResultOnPage: 10,
      },
    },
  },
};
