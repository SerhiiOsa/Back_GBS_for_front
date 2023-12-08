const itemDataAccess = require("../data_access/item.js");

module.exports = {
  async existingItem(itemId, tableName, trx) {
    if (isNaN(itemId)) {
      const error = new Error("Invalid item ID. Must be a number.");
      error.status = 400;
      throw error;
    }

    const item = await itemDataAccess.findItemById(itemId, tableName, trx);

    if (!item) {
      const error = new Error("This item does not exist.");
      error.status = 400;
      throw error;
    } else {
      return item;
    }
  },

  async existingItemName(itemName, tableName, itemId = null, trx) {
    const existingName = await itemDataAccess.findItemByName(
      itemName,
      tableName,
      trx,
    );

    if (existingName && existingName.id != itemId) {
      const error = new Error("This item name is already exist.");
      error.status = 400;
      throw error;
    }
  },
};
