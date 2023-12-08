const specializationDataAccess = require("../data_access/specialization.js");
const existingItem = require("./existing_item.js");
const db = require("../../db/database.js");

const specializationService = {
  async getNodeList(page, pageSize) {
    const data = await specializationDataAccess.findAllNodes(page, pageSize);

    return data;
  },

  async getSingleNode(nodeId) {
    return existingItem.existingItem(nodeId, "specializations");
  },

  async getChildNodes(parentId) {
    return await specializationDataAccess.findNodesByParentId(parentId);
  },

  async getNodeTree(nodeId) {
    await existingItem.existingItem(nodeId, "specializations");

    return await specializationDataAccess.findAllInBranchById(nodeId);
  },

  async createNode(nodeName, description, extendedDescription, parentId) {
    let createdNode;

    await db.transaction(async (trx) => {
      await existingItem.existingItemName(nodeName, "specializations", trx);

      if (parentId) {
        await existingItem.existingItem(parentId, "specializations", trx);
      }

      createdNode = await specializationDataAccess.addNode(
        nodeName,
        description,
        extendedDescription,
        parentId,
        trx,
      );
    });

    return createdNode;
  },

  async updateNode(nodeId, nodeName, description, extendedDescription) {
    let updatedNode;

    await db.transaction(async (trx) => {
      await existingItem.existingItemName(
        nodeName,
        "specializations",
        nodeId,
        trx,
      );

      await existingItem.existingItem(nodeId, "specializations", trx);

      updatedNode = await specializationDataAccess.updateNode(
        nodeId,
        nodeName,
        description,
        extendedDescription,
        trx,
      );
    });

    return updatedNode;
  },

  async deleteNode(nodeId) {
    let deletedNode;

    await db.transaction(async (trx) => {
      await existingItem.existingItem(nodeId, "specializations", trx);

      deletedNode = await specializationDataAccess.deleteNode(nodeId, trx);
    });

    return deletedNode;
  },
};

module.exports = specializationService;
