const specializationDataAccess = require("../data_access/specialization.js");

async function formatNode(node) {
  const formattedNode = { ...node };
  const children = await specializationDataAccess.findNodesByParentId(
    formattedNode.id,
  );

  formattedNode.children = [];

  for (const child of children) {
    const currentChild = await formatNode(child);

    formattedNode.children.push(currentChild);
  }

  return formattedNode;
}

module.exports = formatNode;
