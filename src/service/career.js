const careerDataAccess = require("../data_access/career.js");
const itemDataAccess = require("../data_access/item.js");
const db = require("../../db/database.js");
const assertItemExists = require("./utils/assert_item_exists.js");

const careerService = {
  async getCareerLevelList(page, pageSize) {
    return await careerDataAccess.findAllCareerLevels(page, pageSize);
  },

  async getSingleCareerLevel(careerLevelId) {
    const item = await careerDataAccess.findCareerLevelById(careerLevelId);
    assertItemExists(item);

    return item;
  },

  async createCareerLevel(careerLevel, trainingTerm) {
    return await careerDataAccess.addCareerLevel(careerLevel, trainingTerm);
  },

  async updateCareerLevel(careerLevelId, careerLevel, trainingTerm) {
    const trx = await db.transaction();

    try {
      const item = await itemDataAccess.findItemById(
        careerLevelId,
        "career",
        trx,
      );
      assertItemExists(item);

      const updatedCareerLevel = await careerDataAccess.updateCareerLevel(
        careerLevelId,
        careerLevel,
        trainingTerm,
        trx,
      );

      await trx.commit();
      return updatedCareerLevel;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async deleteCareerLevel(careerLevelId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(
        careerLevelId,
        "career",
        trx,
      );
      assertItemExists(item);

      await careerDataAccess.removeAllLinks(careerLevelId, trx);

      const deletedCareerLevel = await careerDataAccess.deleteCareerLevel(
        careerLevelId,
        trx,
      );

      await trx.commit();
      return deletedCareerLevel;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async getCareerLevelSpecializations(careerLevelId) {
    const trx = await db.transaction();
    try {
      const item = await itemDataAccess.findItemById(
        careerLevelId,
        "career",
        trx,
      );
      assertItemExists(item);

      const specializationsList =
        await careerDataAccess.getSpecializationsByCareerLevelId(
          careerLevelId,
          trx,
        );

      await trx.commit();
      return specializationsList;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async addSpecializationToCareerLevel(careerLevelId, specializationId) {
    const trx = await db.transaction();
    try {
      const video = await itemDataAccess.findItemById(
        careerLevelId,
        "career",
        trx,
      );
      assertItemExists(video);

      const specialization = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(specialization);

      const createdLink = await careerDataAccess.addSpecializationToCareerLevel(
        careerLevelId,
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

  async removeSpecializationFromCareerLevel(careerLevelId, specializationId) {
    const trx = await db.transaction();
    try {
      const video = await itemDataAccess.findItemById(
        careerLevelId,
        "career",
        trx,
      );
      assertItemExists(video);

      const specialization = await itemDataAccess.findItemById(
        specializationId,
        "specializations",
        trx,
      );
      assertItemExists(specialization);

      const link = await itemDataAccess.findLinkRecord(
        "career_id",
        careerLevelId,
        "specialization_id",
        specializationId,
        "career_specializations",
        trx,
      );

      if (!link) {
        const error = new Error("This link does not exist.");
        error.status = 400;
        throw error;
      }

      const deletedLink =
        await careerDataAccess.removeSpecializationFromCareerLevel(
          careerLevelId,
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

module.exports = careerService;
