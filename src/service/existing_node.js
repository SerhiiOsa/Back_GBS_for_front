const specializationDataAccess = require("../data_access/specialization.js");

module.exports = {
  async existingNode(nodeId) {
    if (isNaN(nodeId)) {
      const error = new Error("Invalid node ID. Must be a number.");
      error.status = 400;
      throw error;
    }

    const node = await specializationDataAccess.findNodeById(nodeId);

    if (!node) {
      const error = new Error("This node does not exist.");
      error.status = 400;
      throw error;
    } else {
      return node;
    }
  },

  async existingNodeName(nodeName, nodeId) {
    const existingName =
      await specializationDataAccess.findnodeByName(nodeName);

    if (existingName && existingName.id != nodeId) {
      const error = new Error("This node name is already exist.");
      error.status = 400;
      throw error;
    }
  },
};
