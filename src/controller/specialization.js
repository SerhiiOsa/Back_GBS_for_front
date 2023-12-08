const specializationService = require("../service/specialization.js");
const sendData = require("../service/send_data.js");
const config = require("../config/config.js");

const specializationController = {
  async getNodesOptionally(ctx) {
    const view = ctx.query.view || "default";

    switch (view) {
      case "default":
      case "list":
        await specializationController.getNodeList(ctx);
        break;
      case "tree":
        await specializationController.getNodeTree(ctx);
        break;
      default:
        ctx.status = 400;
        ctx.body = { error: "Invalid view parameter" };
        break;
    }
  },

  async getNodeList(ctx) {
    const nodeId = ctx.query.parent_id || null;

    if (nodeId) {
      const childNodesData = await specializationService.getChildNodes(nodeId);

      await sendData(childNodesData, ctx);
    } else {
      const page = parseInt(ctx.query.page) || config.defaultPagination.page;
      const pageSize =
        parseInt(ctx.query.pageSize) || config.defaultPagination.pageSize;

      const nodeListData = await specializationService.getNodeList(
        page,
        pageSize,
      );

      await sendData(nodeListData, ctx);
    }
  },

  async getSingleNode(ctx) {
    const nodeId = ctx.params.id;
    const nodeData = await specializationService.getSingleNode(nodeId);

    await sendData(nodeData, ctx);
  },

  async getNodeTree(ctx) {
    const nodeId = ctx.query.parent_id;
    const nodeTreeData = await specializationService.getNodeTree(nodeId);

    await sendData(nodeTreeData, ctx);
  },

  async createNode(ctx) {
    const { nodeName, description, extendedDescription, parentId } =
      ctx.request.body;
    const createdNode = await specializationService.createNode(
      nodeName,
      description,
      extendedDescription,
      parentId,
    );

    if (createdNode) {
      ctx.status = 201;
      ctx.body = { node: createdNode };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async updateNode(ctx) {
    const { nodeName, description, extendedDescription } = ctx.request.body;
    const nodeId = ctx.params.id;

    const updatedNode = await specializationService.updateNode(
      nodeId,
      nodeName,
      description,
      extendedDescription,
    );

    if (updatedNode) {
      ctx.status = 200;
      ctx.body = { node: updatedNode };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },

  async deleteNode(ctx) {
    const nodeId = ctx.params.id;
    const result = await specializationService.deleteNode(nodeId);

    if (result) {
      ctx.status = 200;
      ctx.body = { message: "Node deleted successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },
};

module.exports = specializationController;
