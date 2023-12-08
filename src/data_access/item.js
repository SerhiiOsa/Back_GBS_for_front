const db = require("../../db/database.js");

const dataAccess = {
  async findItemById(itemId, tableName) {
    return await db(tableName).where("id", itemId).first();
  },

  async findItemByName(itemName, tableName) {
    if (tableName === "specializations") {
      return await db("specializations").where("node_name", itemName).first();
    } else {
      const columnName = tableName.slice(0, -1) + "_name";
      return await db(tableName).where(columnName, itemName).first();
    }
  },
};

module.exports = dataAccess;
