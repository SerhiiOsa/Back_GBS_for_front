const db = require("../../db/database.js");
const config = require("../config/config.js");
const { CareerLevel, Specialization } = require("./models/model.js");

const dataAccess = {
  async findCareerLevelById(careerLevelId) {
    const data = await db("career").where("id", careerLevelId).first();

    if (!data) {
      return null;
    }

    return new CareerLevel(data);
  },

  async findAllCareerLevels(
    page = config.defaultPagination.page,
    pageSize = config.defaultPagination.pageSize,
  ) {
    const offset = (page - 1) * pageSize;
    const data = await db("career").offset(offset).limit(pageSize);

    return data.map((item) => {
      return new CareerLevel(item);
    });
  },

  async addCareerLevel(careerLevel, trainingTerm) {
    const [careerLevelId] = await db("career")
      .insert({ name: careerLevel, training_term: trainingTerm })
      .returning("id");

    return careerLevelId;
  },

  async updateCareerLevel(careerLevelId, careerLevel, trainingTerm, trx) {
    const updated_at = trx.fn.now();

    await trx("career")
      .where("id", careerLevelId)
      .update({ name: careerLevel, training_term: trainingTerm, updated_at });

    return careerLevelId;
  },

  async deleteCareerLevel(careerLevelId, trx) {
    await trx("career").where("id", careerLevelId).del();

    return careerLevelId;
  },

  async getSpecializationsByCareerLevelId(careerLevelId) {
    const data = await db("career_specializations")
      .where("career_id", careerLevelId)
      .join("specializations", "specialization_id", "=", "specializations.id")
      .select("specializations.*");

    return data.map((item) => {
      return new Specialization(item);
    });
  },

  async addSpecializationToCareerLevel(careerLevelId, specializationId, trx) {
    await trx("career_specializations").insert({
      career_id: careerLevelId,
      specialization_id: specializationId,
    });

    return { careerLevelId, specializationId };
  },

  async removeSpecializationFromCareerLevel(
    careerLevelId,
    specializationId,
    trx,
  ) {
    await trx("career_specializations")
      .where({
        career_id: careerLevelId,
        specialization_id: specializationId,
      })
      .del();

    return { careerLevelId, specializationId };
  },

  async removeAllLinks(careerLevelId, trx) {
    await trx("career_specializations").where("career_id", careerLevelId).del();
  },
};

module.exports = dataAccess;
