const Router = require("@koa/router");
const router = new Router();
const specializationController = require("../controller/specialization.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");

router.get("/:id", specializationController.getSingleNode);

router.get("/", specializationController.getNodesOptionally);

router.use(authorizedUser);

router.post("/", validator.nodeValidator, specializationController.createNode);

router.put(
  "/:id",
  validator.nodeValidator,
  specializationController.updateNode,
);

router.delete("/:id", specializationController.deleteNode);

module.exports = router;
