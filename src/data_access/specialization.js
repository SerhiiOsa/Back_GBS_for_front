const db = require("../../db/database.js");
const config = require("../config/config.js");

const dataAccess = {
  async findAllNodes(
    page = config.defaultPagination.page,
    pageSize = config.defaultPagination.pageSize,
  ) {
    const offset = (page - 1) * pageSize;
    return db("specializations").offset(offset).limit(pageSize);
  },

  async findNodeById(nodeId) {
    return db("specializations").where("id", nodeId).first();
  },

  async findNodesByParentId(nodeId) {
    return db("specializations").where("parent_id", nodeId);
  },

  async findnodeByName(nodename) {
    return db("specializations").where("node_name", nodename).first();
  },

  async findAllInBranchById(nodeId) {
    return db
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

  async addNode(nodeName, description, parentId) {
    await db("specializations").insert({
      node_name: nodeName,
      description,
      parent_id: parentId,
    });

    return { node_name: nodeName, description };
  },

  async updateNode(nodeId, nodeName, description) {
    await db("specializations").where("id", nodeId).update({
      node_name: nodeName,
      description,
    });

    return { node_name: nodeName, description };
  },

  async deleteNode(nodeId) {
    return db("specializations").where("id", nodeId).del();
  },
};

module.exports = dataAccess;
