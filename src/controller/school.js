const schoolService = require("../service/school.js");
const sendData = require("../service/send_data.js");
const config = require("../config/config.js");

const schoolController = {
  async getSchools(ctx) {
    const page = parseInt(ctx.query.page) || config.defaultPagination.page;
    const pageSize =
      parseInt(ctx.query.pageSize) || config.defaultPagination.pageSize;

    const schoolListData = await schoolService.getSchoolList(page, pageSize);

    await sendData(schoolListData, ctx);
  },

  async getSingleSchool(ctx) {
    const schoolId = ctx.params.id;
    const schoolData = await schoolService.getSingleSchool(schoolId);

    await sendData(schoolData, ctx);
  },

  async createSchool(ctx) {
    const { schoolName, description, link } = ctx.request.body;
    const createdSchool = await schoolService.createSchool(
      schoolName,
      description,
      link,
    );

    if (createdSchool) {
      ctx.status = 201;
      ctx.body = { school: createdSchool };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async updateSchool(ctx) {
    const { schoolName, description, link } = ctx.request.body;
    const schoolId = ctx.params.id;

    const updatedSchool = await schoolService.updateSchool(
      schoolId,
      schoolName,
      description,
      link,
    );

    if (updatedSchool) {
      ctx.status = 200;
      ctx.body = { school: updatedSchool };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async deleteSchool(ctx) {
    const schoolId = ctx.params.id;
    const result = await schoolService.deleteSchool(schoolId);

    if (result) {
      ctx.status = 200;
      ctx.body = { message: "School deleted successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },
};

module.exports = schoolController;
