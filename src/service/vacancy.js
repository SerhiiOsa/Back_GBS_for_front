const vacancyDataAccess = require("../data_access/vacancy.js");
const config = require("../config/config.js");

const vacancyService = {
  async getVacancies(...args) {
    const basicParams = config.vacancies.joobleAPI.params;

    const receivedParams = args;
    const searchParams = { ...basicParams };

    for (let i = 0; i < receivedParams.length; i++) {
      if (args[i]) {
        const key = Object.keys(searchParams)[i];
        searchParams[key] = args[i];
      }
    }

    return await vacancyDataAccess.findVacancies(searchParams);
  },
};

module.exports = vacancyService;
