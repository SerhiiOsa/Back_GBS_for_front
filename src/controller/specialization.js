const specializationService = require("../service/specialization.js");
const sendData = require("./utils/send_data.js");
const config = require("../config/config.js");

const specializationController = {
  async getSpecializationsOptionally(ctx) {
    const view = ctx.query.view || "default";

    switch (view) {
      case "default":
      case "list":
        await specializationController.getSpecializationList(ctx);
        break;
      case "tree":
        await specializationController.getSpecializationTree(ctx);
        break;
      default:
        ctx.status = 400;
        ctx.body = { error: "Invalid view parameter" };
        break;
    }
  },

  async getSpecializationList(ctx) {
    const specializationId = ctx.query.parentId || null;
    const root = ctx.query.root;
    const keywords = ctx.query.keywords;

    if (specializationId) {
      const childSpecializationsData =
        await specializationService.getChildSpecializations(specializationId);

      await sendData(childSpecializationsData, ctx);
      return;
    }

    if (root == "true") {
      const rootSpecializationData =
        await specializationService.getRootSpecializations();

      await sendData(rootSpecializationData, ctx);
      return;
    }

    const page = parseInt(ctx.query.page) || config.defaultPagination.page;
    const pageSize =
      parseInt(ctx.query.pageSize) || config.defaultPagination.pageSize;

    const specializationListData =
      await specializationService.getSpecializationList(
        page,
        pageSize,
        keywords,
      );

    await sendData(specializationListData, ctx);
  },

  async getSingleSpecialization(ctx) {
    const specializationId = ctx.params.id;
    const specializationData =
      await specializationService.getSingleSpecialization(specializationId);

    await sendData(specializationData, ctx);
  },

  async getSpecializationTree(ctx) {
    const specializationId = ctx.query.parentId;
    const specializationTreeData =
      await specializationService.getSpecializationTree(specializationId);

    await sendData(specializationTreeData, ctx);
  },

  async createSpecialization(ctx) {
    const { specializationName, description, extendedDescription, parentId } =
      ctx.request.body;

    const image = ctx.files.image;

    const createdSpecialization =
      await specializationService.createSpecialization(
        specializationName,
        description,
        extendedDescription,
        parentId,
        image,
      );

    if (createdSpecialization) {
      ctx.status = 201;
      ctx.body = { specialization: createdSpecialization };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async updateSpecialization(ctx) {
    const { specializationName, description, extendedDescription } =
      ctx.request.body;
    const specializationId = ctx.params.id;

    const image = ctx.files.image;

    const updatedSpecialization =
      await specializationService.updateSpecialization(
        specializationId,
        specializationName,
        description,
        extendedDescription,
        image,
      );

    if (updatedSpecialization) {
      ctx.status = 200;
      ctx.body = { specialization: updatedSpecialization };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async deleteSpecialization(ctx) {
    const specializationId = ctx.params.id;
    const result =
      await specializationService.deleteSpecialization(specializationId);

    if (result) {
      ctx.status = 200;
      ctx.body = { message: "Specialization deleted successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async getSpecializationSchools(ctx) {
    const specializationId = ctx.params.id;
    const specializationSchoolsData =
      await specializationService.getSpecializationSchools(specializationId);

    await sendData(specializationSchoolsData, ctx);
  },

  async addSchoolToSpecialization(ctx) {
    const specializationId = ctx.params.id;
    const schoolId = ctx.params.schoolId;

    const createdLink = await specializationService.addSchoolToSpecialization(
      specializationId,
      schoolId,
    );

    if (createdLink) {
      ctx.status = 201;
      ctx.body = { newLink: createdLink };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async removeSchoolFromSpecialization(ctx) {
    const specializationId = ctx.params.id;
    const schoolId = ctx.params.schoolId;

    const result = await specializationService.removeSchoolFromSpecialization(
      specializationId,
      schoolId,
    );

    if (result) {
      ctx.status = 200;
      ctx.body = { message: "Link was removed successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async getSpecializationVideos(ctx) {
    const specializationId = ctx.params.id;
    const specializationVideosData =
      await specializationService.getSpecializationVideos(specializationId);

    await sendData(specializationVideosData, ctx);
  },

  async addVideoToSpecialization(ctx) {
    const specializationId = ctx.params.id;
    const videoId = ctx.params.videoId;

    const createdLink = await specializationService.addVideoToSpecialization(
      specializationId,
      videoId,
    );

    if (createdLink) {
      ctx.status = 201;
      ctx.body = { newLink: createdLink };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async removeVideoFromSpecialization(ctx) {
    const specializationId = ctx.params.id;
    const videoId = ctx.params.videoId;

    const result = await specializationService.removeVideoFromSpecialization(
      specializationId,
      videoId,
    );

    if (result) {
      ctx.status = 200;
      ctx.body = { message: "Link was removed successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async getSpecializationCareerLevels(ctx) {
    const specializationId = ctx.params.id;
    const careerLevel = ctx.query.level;

    const specializationCareerLevelsData =
      await specializationService.getSpecializationCareerLevels(
        specializationId,
        careerLevel,
      );

    await sendData(specializationCareerLevelsData, ctx);
  },

  async addCareerLevelToSpecialization(ctx) {
    const specializationId = ctx.params.id;
    const careerLevelId = ctx.params.careerLevelId;

    const createdLink =
      await specializationService.addCareerLevelToSpecialization(
        specializationId,
        careerLevelId,
      );

    ctx.status = 201;
    ctx.body = { newLink: createdLink };
  },

  async removeCareerLevelFromSpecialization(ctx) {
    const specializationId = ctx.params.id;
    const careerLevelId = ctx.params.careerLevelId;

    await specializationService.removeCareerLevelFromSpecialization(
      specializationId,
      careerLevelId,
    );

    ctx.status = 200;
    ctx.body = { message: "Link was removed successfully" };
  },
};

module.exports = specializationController;
