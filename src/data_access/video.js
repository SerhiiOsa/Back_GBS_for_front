const db = require("../../db/database.js");
const config = require("../config/config.js");
const { Video, Specialization } = require("./models/model.js");

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

  async getSpecializationsByVideoId(videoId) {
    const data = await db("video_specializations")
      .where("video_id", videoId)
      .join("specializations", "specialization_id", "=", "specializations.id")
      .select("specializations.*");

    return data.map((item) => {
      return new Specialization(item);
    });
  },

  async addSpecializationToVideo(videoId, specializationId, trx) {
    await trx("video_specializations").insert({
      video_id: videoId,
      specialization_id: specializationId,
    });

    return { videoId, specializationId };
  },

  async removeSpecializationFromVideo(videoId, specializationId, trx) {
    await trx("video_specializations")
      .where({
        video_id: videoId,
        specialization_id: specializationId,
      })
      .del();

    return { videoId, specializationId };
  },
};

module.exports = dataAccess;
