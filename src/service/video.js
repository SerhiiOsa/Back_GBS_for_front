const videoDataAccess = require("../data_access/video.js");
const itemDataAccess = require("../data_access/item.js");
const db = require("../../db/database.js");
const assertItemExists = require("./utils/assert_item_exists.js");

const videoService = {
  async getVideoList(page, pageSize) {
    return await videoDataAccess.findAllVideos(page, pageSize);
  },

  async getSingleVideo(videoId) {
    const item = await videoDataAccess.findVideoById(videoId);
    assertItemExists(item);

    return item;
  },

  async createVideo(videoName, link) {
    return await videoDataAccess.addVideo(videoName, link);
  },

  async updateVideo(videoId, videoName, link) {
    const trx = await db.transaction();

    try {
      const item = await itemDataAccess.findItemById(videoId, "videos", trx);
      assertItemExists(item);

      const updatedVideo = await videoDataAccess.updateVideo(
        videoId,
        videoName,
        link,
        trx,
      );

      await trx.commit();
      return updatedVideo;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async deleteVideo(videoId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(videoId, "videos", trx);
      assertItemExists(item);

      await videoDataAccess.removeAllLinks(videoId, trx);

      const deletedVideo = await videoDataAccess.deleteVideo(videoId, trx);

      await trx.commit();
      return deletedVideo;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async getVideoSpecializations(videoId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(videoId, "videos", trx);
      assertItemExists(item);

      const specializationsList =
        await videoDataAccess.getSpecializationsByVideoId(videoId, trx);

      await trx.commit();
      return specializationsList;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async addSpecializationToVideo(videoId, specializationId) {
    const trx = await db.transaction();
    try {
      const video = await itemDataAccess.findItemById(videoId, "videos", trx);
      assertItemExists(video);

      const specialization = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(specialization);

      const link = await itemDataAccess.findLinkRecord(
        "video_id",
        videoId,
        "specialization_id",
        specializationId,
        "video_specializations",
        trx,
      );

      if (link) {
        const error = new Error("This link is already exist.");
        error.status = 400;
        throw error;
      }

      const createdLink = await videoDataAccess.addSpecializationToVideo(
        videoId,
        specializationId,
        trx,
      );

      await trx.commit();
      return createdLink;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async removeSpecializationFromVideo(videoId, specializationId) {
    const trx = await db.transaction();
    try {
      const video = await itemDataAccess.findItemById(videoId, "videos", trx);
      assertItemExists(video);

      const specialization = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(specialization);

      const link = await itemDataAccess.findLinkRecord(
        "video_id",
        videoId,
        "specialization_id",
        specializationId,
        "video_specializations",
        trx,
      );

      if (!link) {
        const error = new Error("This link does not exist.");
        error.status = 400;
        throw error;
      }

      const deletedLink = await videoDataAccess.removeSpecializationFromVideo(
        videoId,
        specializationId,
        trx,
      );

      await trx.commit();
      return deletedLink;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },
};

module.exports = videoService;
