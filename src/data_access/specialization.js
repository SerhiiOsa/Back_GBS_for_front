const db = require("../../db/database.js");
const config = require("../config/config.js");
const { School, Specialization } = require("./models/model.js");

const dataAccess = {
  async findSpecializationById(specializationId) {
    const data = await db("specializations")
      .where("id", specializationId)
      .first();

    if (!data) {
      return null;
    }

    return new Specialization(data);
  },

  async findAllSpecializations(
    page = config.defaultPagination.page,
    pageSize = config.defaultPagination.pageSize,
    keywords,
  ) {
    const offset = (page - 1) * pageSize;

    let query = db("specializations").offset(offset).limit(pageSize);

    if (keywords) {
      query = query.where("name", "ilike", `%${keywords}%`);
    }

    const data = await query;

    return data.map((item) => {
      return new Specialization(item);
    });
  },

  async findSpecializationsByParentId(specializationId, trx) {
    const data = await trx("specializations").where(
      "parent_id",
      specializationId,
    );

    return data.map((item) => {
      return new Specialization(item);
    });
  },

  async findRootSpecializations() {
    const data = await db("specializations").where("parent_id", null);

    return data.map((item) => {
      return new Specialization(item);
    });
  },

  async findAllInBranchById(specializationId, trx) {
    const data = await trx
      .withRecursive("subtree", (qb) => {
        qb.select("*")
          .from("specializations")
          .where("id", specializationId)
          .unionAll((qb) =>
            qb
              .select("specializations.*")
              .from("specializations")
              .join(
                "subtree",
                db.raw("subtree.id = specializations.parent_id"),
              ),
          );
      })
      .select("*")
      .from("subtree");

    return data.map((item) => {
      return new Specialization(item);
    });
  },

  async addSpecialization(
    specializationName,
    description,
    extendedDescription,
    parentId,
    trx,
  ) {
    const [specializationId] = await trx("specializations")
      .insert({
        name: specializationName,
        description,
        extended_description: extendedDescription,
        parent_id: parentId,
      })
      .returning("id");

    return specializationId;
  },

  async updateSpecialization(
    specializationId,
    specializationName,
    description,
    extendedDescription,
    trx,
  ) {
    const updated_at = trx.fn.now();

    await trx("specializations").where("id", specializationId).update({
      name: specializationName,
      description,
      extended_description: extendedDescription,
      updated_at,
    });

    return specializationId;
  },

  async deleteSpecialization(specializationId, trx) {
    await trx("specializations").where("id", specializationId).del();

    return specializationId;
  },

  async getSchoolsBySpecializationId(specializationId) {
    const data = await db("school_specializations")
      .where("specialization_id", specializationId)
      .join("schools", "school_id", "=", "schools.id")
      .select("schools.*");

    return data.map((item) => {
      return new School(item);
    });
  },

  async addSchoolToSpecialization(specializationId, schoolId, trx) {
    await trx("school_specializations").insert({
      specialization_id: specializationId,
      school_id: schoolId,
    });

    return { specializationId, schoolId };
  },

  async removeSchoolFromSpecialization(specializationId, schoolId, trx) {
    await trx("school_specializations")
      .where({
        specialization_id: specializationId,
        school_id: schoolId,
      })
      .del();

    return { specializationId, schoolId };
  },
};

module.exports = dataAccess;
