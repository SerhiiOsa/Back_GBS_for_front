const schoolDataAccess = require("../data_access/school.js");
const existingItem = require("./existing_item.js");
const db = require("../../db/database.js");

const schoolService = {
  async getSchoolList(page, pageSize) {
    return await schoolDataAccess.findAllSchools(page, pageSize);
  },

  async getSingleSchool(schoolId) {
    return existingItem.existingItem(schoolId, "schools");
  },

  async createSchool(schoolName, description, link) {
    let createdSchool;

    await db.transaction(async (trx) => {
      await existingItem.existingItemName(schoolName, "schools", trx);

      createdSchool = await schoolDataAccess.addSchool(
        schoolName,
        description,
        link,
        trx,
      );
    });

    return createdSchool;
  },

  async updateSchool(schoolId, schoolName, description, link) {
    let updatedSchool;

    await db.transaction(async (trx) => {
      await existingItem.existingItemName(schoolName, "schools", schoolId, trx);

      await existingItem.existingItem(schoolId, "schools", trx);

      updatedSchool = await schoolDataAccess.updateSchool(
        schoolId,
        schoolName,
        description,
        link,
        trx,
      );
    });

    return updatedSchool;
  },

  async deleteSchool(schoolId) {
    let deletedSchool;

    await db.transaction(async (trx) => {
      await existingItem.existingItem(schoolId, "schools", trx);

      deletedSchool = await schoolDataAccess.deleteSchool(schoolId, trx);
    });

    return deletedSchool;
  },
};

module.exports = schoolService;
