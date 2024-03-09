const careerService = require("../service/career.js");
const sendData = require("./utils/send_data.js");
const config = require("../config/config.js");

const careerController = {
  async getCareerLevels(ctx) {
    const page = parseInt(ctx.query.page) || config.defaultPagination.page;
    const pageSize =
      parseInt(ctx.query.pageSize) || config.defaultPagination.pageSize;

    const careerListData = await careerService.getCareerLevelList(
      page,
      pageSize,
    );

    await sendData(careerListData, ctx);
  },

  async getSingleCareerLevel(ctx) {
    const careerLevelId = ctx.params.id;
    const careerData = await careerService.getSingleCareerLevel(careerLevelId);

    await sendData(careerData, ctx);
  },

  async createCareerLevel(ctx) {
    const { careerLevel, trainingTerm } = ctx.request.body;

    const createdCareerLevel = await careerService.createCareerLevel(
      careerLevel,
      trainingTerm,
    );

    ctx.status = 201;
    ctx.body = { careerLevel: createdCareerLevel };
  },

  async updateCareerLevel(ctx) {
    const { careerLevel, trainingTerm } = ctx.request.body;
    const careerLevelId = ctx.params.id;

    const updatedCareerLevels = await careerService.updateCareerLevel(
      careerLevelId,
      careerLevel,
      trainingTerm,
    );

    ctx.status = 200;
    ctx.body = { career: updatedCareerLevels };
  },

  async deleteCareerLevel(ctx) {
    const careerLevelId = ctx.params.id;
    await careerService.deleteCareerLevel(careerLevelId);

    ctx.status = 200;
    ctx.body = { message: "CareerLevel deleted successfully" };
  },

  async getCareerLevelSpecializations(ctx) {
    const careerLevelId = ctx.params.id;
    const careerSpecializationsData =
      await careerService.getCareerLevelSpecializations(careerLevelId);

    await sendData(careerSpecializationsData, ctx);
  },

  async addSpecializationToCareerLevel(ctx) {
    const careerLevelId = ctx.params.id;
    const specializationId = ctx.params.specializationId;

    const createdLink = await careerService.addSpecializationToCareerLevel(
      careerLevelId,
      specializationId,
    );

    ctx.status = 201;
    ctx.body = { newLink: createdLink };
  },

  async removeSpecializationFromCareerLevel(ctx) {
    const careerLevelId = ctx.params.id;
    const specializationId = ctx.params.specializationId;
    await careerService.removeSpecializationFromCareerLevel(
      careerLevelId,
      specializationId,
    );

    ctx.status = 200;
    ctx.body = { message: "Link was removed successfully" };
  },
};

module.exports = careerController;
