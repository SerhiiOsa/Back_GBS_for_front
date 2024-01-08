const schoolDataAccess = require("../data_access/school.js");
const itemDataAccess = require("../data_access/item.js");
const db = require("../../db/database.js");
const assertItemExists = require("./utils/assert_item_exists.js");

const schoolService = {
  async getSchoolList(page, pageSize) {
    return await schoolDataAccess.findAllSchools(page, pageSize);
  },

  async getSingleSchool(schoolId) {
    const item = await schoolDataAccess.findSchoolById(schoolId);
    assertItemExists(item);

    return item;
  },

  async createSchool(schoolName, description, link) {
    return await schoolDataAccess.addSchool(schoolName, description, link);
  },

  async updateSchool(schoolId, schoolName, description, link) {
    const trx = await db.transaction();

    try {
      const item = await itemDataAccess.findItemById(schoolId, "schools", trx);
      assertItemExists(item);

      const updatedSchool = await schoolDataAccess.updateSchool(
        schoolId,
        schoolName,
        description,
        link,
        trx,
      );

      await trx.commit();
      return updatedSchool;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async deleteSchool(schoolId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(schoolId, "schools", trx);
      assertItemExists(item);

      const deletedSchool = await schoolDataAccess.deleteSchool(schoolId, trx);

      await trx.commit();
      return deletedSchool;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async getSchoolSpecializations(schoolId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(schoolId, "schools", trx);
      assertItemExists(item);

      const specializationsList =
        await schoolDataAccess.getSpecializationsBySchoolId(schoolId, trx);

      await trx.commit();
      return specializationsList;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async addSpecializationToSchool(schoolId, specializationId) {
    const trx = await db.transaction();
    try {
      const school = await itemDataAccess.findItemById(
        schoolId,
        "schools",
        trx,
      );
      assertItemExists(school);

      const specialization = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(specialization);

      const link = await itemDataAccess.findLinkRecord(
        "school_id",
        schoolId,
        "specialization_id",
        specializationId,
        "school_specializations",
        trx,
      );

      if (link) {
        const error = new Error("This link is already exist.");
        error.status = 400;
        throw error;
      }

      const createdLink = await schoolDataAccess.addSpecializationToSchool(
        schoolId,
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

  async removeSpecializationFromSchool(schoolId, specializationId) {
    const trx = await db.transaction();
    try {
      const school = await itemDataAccess.findItemById(
        schoolId,
        "schools",
        trx,
      );
      assertItemExists(school);

      const specialization = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(specialization);

      const link = await itemDataAccess.findLinkRecord(
        "school_id",
        schoolId,
        "specialization_id",
        specializationId,
        "school_specializations",
        trx,
      );

      if (!link) {
        const error = new Error("This link does not exist.");
        error.status = 400;
        throw error;
      }

      const deletedLink = await schoolDataAccess.removeSpecializationFromSchool(
        schoolId,
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

module.exports = schoolService;
