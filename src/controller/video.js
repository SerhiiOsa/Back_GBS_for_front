const videoService = require("../service/video.js");
const sendData = require("./utils/send_data.js");
const config = require("../config/config.js");

const videoController = {
  async getVideos(ctx) {
    const page = parseInt(ctx.query.page) || config.defaultPagination.page;
    const pageSize =
      parseInt(ctx.query.pageSize) || config.defaultPagination.pageSize;

    const videoListData = await videoService.getVideoList(page, pageSize);

    await sendData(videoListData, ctx);
  },

  async getSingleVideo(ctx) {
    const videoId = ctx.params.id;
    const videoData = await videoService.getSingleVideo(videoId);

    await sendData(videoData, ctx);
  },

  async createVideo(ctx) {
    const { videoName, link } = ctx.request.body;
    const createdVideo = await videoService.createVideo(videoName, link);

    if (createdVideo) {
      ctx.status = 201;
      ctx.body = { video: createdVideo };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async updateVideo(ctx) {
    const { videoName, link } = ctx.request.body;
    const videoId = ctx.params.id;

    const updatedVideo = await videoService.updateVideo(
      videoId,
      videoName,
      link,
    );

    if (updatedVideo) {
      ctx.status = 200;
      ctx.body = { video: updatedVideo };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async deleteVideo(ctx) {
    const videoId = ctx.params.id;
    const result = await videoService.deleteVideo(videoId);

    if (result) {
      ctx.status = 200;
      ctx.body = { message: "Video deleted successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async getVideoSpecializations(ctx) {
    const videoId = ctx.params.id;
    const videoSpecializationsData =
      await videoService.getVideoSpecializations(videoId);

    await sendData(videoSpecializationsData, ctx);
  },

  async addSpecializationToVideo(ctx) {
    const videoId = ctx.params.id;
    const specializationId = ctx.params.specializationId;

    const createdLink = await videoService.addSpecializationToVideo(
      videoId,
      specializationId,
    );

    if (createdLink) {
      ctx.status = 201;
      ctx.body = { newLink: createdLink };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async removeSpecializationFromVideo(ctx) {
    const videoId = ctx.params.id;
    const specializationId = ctx.params.specializationId;
    const result = await videoService.removeSpecializationFromVideo(
      videoId,
      specializationId,
    );

    if (result) {
      ctx.status = 200;
      ctx.body = { message: "Link was removed successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },
};

module.exports = videoController;
