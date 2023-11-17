const specializationDataAccess = require("../data_access/specialization.js");
const existingItem = require("./existing_node.js");
const db = require("../../db/database.js");

const specializationService = {
  async getNodeList(page, pageSize) {
    const data = await specializationDataAccess.findAllNodes(page, pageSize);

    return data;
  },

  async getSingleNode(nodeId) {
    return existingItem.existingNode(nodeId);
  },

  async getChildNodes(parentId) {
    return await specializationDataAccess.findNodesByParentId(parentId);
  },

  async getNodeTree(nodeId) {
    await existingItem.existingNode(nodeId);

    return await specializationDataAccess.findAllInBranchById(nodeId);
  },

  async createNode(nodeName, description, parentId) {
    let createdNode;

    await db.transaction(async (trx) => {
      await existingItem.existingNodeName(nodeName, trx);

      if (parentId) {
        await existingItem.existingNode(parentId, trx);
      }

      createdNode = await specializationDataAccess.addNode(
        nodeName,
        description,
        parentId,
        trx,
      );
    });

    return createdNode;
  },

  async updateNode(nodeId, nodeName, description) {
    let updatedNode;

    await db.transaction(async (trx) => {
      await existingItem.existingNodeName(nodeName, nodeId, trx);

      await existingItem.existingNode(nodeId, trx);

      updatedNode = await specializationDataAccess.updateNode(
        nodeId,
        nodeName,
        description,
        trx,
      );
    });

    return updatedNode;
  },

  async deleteNode(nodeId) {
    let deletedNode;

    await db.transaction(async (trx) => {
      await existingItem.existingNode(nodeId, trx);

      deletedNode = await specializationDataAccess.deleteNode(nodeId, trx);
    });

    return deletedNode;
  },
};

module.exports = specializationService;
