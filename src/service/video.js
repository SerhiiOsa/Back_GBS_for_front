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

      const deletedVideo = await videoDataAccess.deleteVideo(videoId, trx);

      await trx.commit();
      return deletedVideo;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },
};

module.exports = videoService;
