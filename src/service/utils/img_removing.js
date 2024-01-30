const fs = require("fs").promises;
const path = require("path");

async function removeImage(image) {
  const subfolder = path.dirname(image);

  await fs.unlink(image);

  const subfolderStats = await fs.stat(subfolder);

  if (
    subfolderStats.isDirectory() &&
    (await fs.readdir(subfolder)).length === 0
  ) {
    await fs.rmdir(subfolder);
  }
}

module.exports = removeImage;
