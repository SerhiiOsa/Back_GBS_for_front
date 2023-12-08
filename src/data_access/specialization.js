const db = require("../../db/database.js");
const config = require("../config/config.js");

const dataAccess = {
  async findAllNodes(
    page = config.defaultPagination.page,
    pageSize = config.defaultPagination.pageSize,
  ) {
    const offset = (page - 1) * pageSize;
    return await db("specializations").offset(offset).limit(pageSize);
  },

  async findNodesByParentId(nodeId) {
    return await db("specializations").where("parent_id", nodeId);
  },

  async findAllInBranchById(nodeId) {
    return await db
      .withRecursive("subtree", (qb) => {
        qb.select("*")
          .from("specializations")
          .where("id", nodeId)
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
  },

  async addNode(nodeName, description, extendedDescription, parentId) {
    await db("specializations").insert({
      node_name: nodeName,
      description,
      extended_description: extendedDescription,
      parent_id: parentId,
    });

    return {
      node_name: nodeName,
      description,
      extended_description: extendedDescription,
    };
  },

  async updateNode(nodeId, nodeName, description, extendedDescription) {
    await db("specializations").where("id", nodeId).update({
      node_name: nodeName,
      description,
      extended_description: extendedDescription,
    });

    return {
      node_name: nodeName,
      description,
      extended_description: extendedDescription,
    };
  },

  async deleteNode(nodeId) {
    return await db("specializations").where("id", nodeId).del();
  },
};

module.exports = dataAccess;
