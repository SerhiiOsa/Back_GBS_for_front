const config = require("../config/config.js");
const { Vacancy } = require("./models/model.js");

const dataAccess = {
  async findVacancies(searchParams) {
    const url = config.vacancies.joobleAPI.url;
    const key = config.vacancies.joobleAPI.key;

    const response = await fetch(url + key, {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(searchParams),
    });
    const data = await response.json();

    return data.jobs.map((item) => {
      return new Vacancy(item);
    });
  },
};

module.exports = dataAccess;
