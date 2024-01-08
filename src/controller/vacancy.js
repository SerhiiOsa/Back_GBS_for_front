const vacancyService = require("../service/vacancy.js");
const sendData = require("./utils/send_data.js");

const vacancyController = {
  async getVacancies(ctx) {
    const { specialization, location, page, pageSize } = ctx.query;

    const vacancies = await vacancyService.getVacancies(
      specialization,
      location,
      page,
      pageSize,
    );

    await sendData(vacancies, ctx);
  },
};

module.exports = vacancyController;
