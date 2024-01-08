const dataAccess = {
  async findItemById(itemId, tableName, trx) {
    return await trx(tableName).where("id", itemId).first();
  },

  async findLinkRecord(
    columnName1,
    value1,
    columnName2,
    value2,
    tableName,
    trx,
  ) {
    return await trx(tableName)
      .where(columnName1, value1)
      .andWhere(columnName2, value2)
      .first();
  },
};

module.exports = dataAccess;
