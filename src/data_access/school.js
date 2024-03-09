const db = require("../../db/database.js");
const config = require("../config/config.js");
const { School, Specialization } = require("./models/model.js");

const dataAccess = {
  async findSchoolById(schoolId) {
    const data = await db("schools").where("id", schoolId).first();

    if (!data) {
      return null;
    }

    return new School(data);
  },

  async findAllSchools(
    page = config.defaultPagination.page,
    pageSize = config.defaultPagination.pageSize,
  ) {
    const offset = (page - 1) * pageSize;
    const data = await db("schools").offset(offset).limit(pageSize);

    return data.map((item) => {
      return new School(item);
    });
  },

  async addSchool(schoolName, description, link, image) {
    const [schoolId] = await db("schools")
      .insert({ name: schoolName, description, link, image })
      .returning("id");

    return schoolId;
  },

  async updateSchool(schoolId, schoolName, description, link, image, trx) {
    const updated_at = trx.fn.now();

    await trx("schools")
      .where("id", schoolId)
      .update({ name: schoolName, description, link, updated_at, image });

    return schoolId;
  },

  async deleteSchool(schoolId, trx) {
    await trx("schools").where("id", schoolId).del();

    return schoolId;
  },

  async getSpecializationsBySchoolId(schoolId) {
    const data = await db("school_specializations")
      .where("school_id", schoolId)
      .join("specializations", "specialization_id", "=", "specializations.id")
      .select("specializations.*");

    return data.map((item) => {
      return new Specialization(item);
    });
  },

  async addSpecializationToSchool(schoolId, specializationId, trx) {
    await trx("school_specializations").insert({
      school_id: schoolId,
      specialization_id: specializationId,
    });

    return { schoolId, specializationId };
  },

  async removeSpecializationFromSchool(schoolId, specializationId, trx) {
    await trx("school_specializations")
      .where({
        school_id: schoolId,
        specialization_id: specializationId,
      })
      .del();

    return { schoolId, specializationId };
  },

  async removeAllLinks(schoolId, trx) {
    await trx("school_specializations").where("school_id", schoolId).del();
  },
};

module.exports = dataAccess;
