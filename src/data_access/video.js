const db = require("../../db/database.js");
const config = require("../config/config.js");
const { Video } = require("./models/model.js");

const dataAccess = {
  async findVideoById(videoId) {
    const data = await db("videos").where("id", videoId).first();

    if (!data) {
      return null;
    }

    return new Video(data);
  },

  async findAllVideos(
    page = config.defaultPagination.page,
    pageSize = config.defaultPagination.pageSize,
  ) {
    const offset = (page - 1) * pageSize;
    const data = await db("videos").offset(offset).limit(pageSize);

    return data.map((item) => {
      return new Video(item);
    });
  },

  async addVideo(videoName, link) {
    const [videoId] = await db("videos")
      .insert({ name: videoName, link })
      .returning("id");

    return videoId;
  },

  async updateVideo(videoId, videoName, link, trx) {
    const updated_at = trx.fn.now();

    await trx("videos")
      .where("id", videoId)
      .update({ name: videoName, link, updated_at });

    return videoId;
  },

  async deleteVideo(videoId, trx) {
    await trx("videos").where("id", videoId).del();

    return videoId;
  },
};

module.exports = dataAccess;
