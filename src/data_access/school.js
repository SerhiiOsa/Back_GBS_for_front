const db = require("../../db/database.js");
const config = require("../config/config.js");

const dataAccess = {
  async findAllSchools(
    page = config.defaultPagination.page,
    pageSize = config.defaultPagination.pageSize,
  ) {
    const offset = (page - 1) * pageSize;
    return await db("schools").offset(offset).limit(pageSize);
  },

  async addSchool(schoolName, description, link) {
    await db("schools").insert({ school_name: schoolName, description, link });

    return { school_name: schoolName, description, link };
  },

  async updateSchool(schoolId, schoolName, description, link) {
    await db("schools")
      .where("id", schoolId)
      .update({ school_name: schoolName, description, link });

    return { school_name: schoolName, description, link };
  },

  async deleteSchool(schoolId) {
    return await db("schools").where("id", schoolId).del();
  },
};

module.exports = dataAccess;
