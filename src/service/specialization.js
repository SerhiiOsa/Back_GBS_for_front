const specializationDataAccess = require("../data_access/specialization.js");
const itemDataAccess = require("../data_access/item.js");
const db = require("../../db/database.js");
const assertItemExists = require("./utils/assert_item_exists.js");

const specializationService = {
  async getSpecializationList(page, pageSize, keywords) {
    return await specializationDataAccess.findAllSpecializations(
      page,
      pageSize,
      keywords,
    );
  },

  async getSingleSpecialization(specializationId) {
    const item =
      await specializationDataAccess.findSpecializationById(specializationId);
    assertItemExists(item);

    return item;
  },

  async getChildSpecializations(parentId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(
        parentId,
        "specializations",
        trx,
      );
      assertItemExists(item);

      const childlenData =
        await specializationDataAccess.findSpecializationsByParentId(
          parentId,
          trx,
        );

      await trx.commit();
      return childlenData;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async getRootSpecializations() {
    return await specializationDataAccess.findRootSpecializations();
  },

  async getSpecializationTree(specializationId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(item);

      const tree = await specializationDataAccess.findAllInBranchById(
        specializationId,
        trx,
      );

      await trx.commit();
      return tree;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async createSpecialization(
    specializationName,
    description,
    extendedDescription,
    parentId,
  ) {
    const trx = await db.transaction();
    try {
      if (parentId) {
        const item = await itemDataAccess.findItemById(
          parentId,
          "specializations",
          trx,
        );
        assertItemExists(item);
      }

      const createdSpecialization =
        await specializationDataAccess.addSpecialization(
          specializationName,
          description,
          extendedDescription,
          parentId,
          trx,
        );

      await trx.commit();
      return createdSpecialization;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async updateSpecialization(
    specializationId,
    specializationName,
    description,
    extendedDescription,
  ) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(item);

      const updatedSpecialization =
        await specializationDataAccess.updateSpecialization(
          specializationId,
          specializationName,
          description,
          extendedDescription,
          trx,
        );

      await trx.commit();
      return updatedSpecialization;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async deleteSpecialization(specializationId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(item);

      const deletedSpecialization =
        await specializationDataAccess.deleteSpecialization(
          specializationId,
          trx,
        );

      await trx.commit();
      return deletedSpecialization;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async getSpecializationSchools(specializationId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(item);

      const schoolsList =
        await specializationDataAccess.getSchoolsBySpecializationId(
          specializationId,
          trx,
        );

      await trx.commit();
      return schoolsList;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async addSchoolToSpecialization(specializationId, schoolId) {
    const trx = await db.transaction();
    try {
      const specialization = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(specialization);

      const school = await itemDataAccess.findItemById(
        schoolId,
        "schools",
        trx,
      );
      assertItemExists(school);

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

      const createdLink =
        await specializationDataAccess.addSchoolToSpecialization(
          specializationId,
          schoolId,
          trx,
        );

      await trx.commit();
      return createdLink;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async removeSchoolFromSpecialization(specializationId, schoolId) {
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

      const deletedLink =
        await specializationDataAccess.removeSchoolFromSpecialization(
          specializationId,
          schoolId,
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

module.exports = specializationService;
