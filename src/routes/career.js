const Router = require("@koa/router");
const router = new Router();
const careerController = require("../controller/career.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");
const multipartConfig = require("./utils/body_parser_config.js");

router.get(
  "/:id",
  validator.paramsValidator,
  careerController.getSingleCareerLevel,
);

router.get("/", careerController.getCareerLevels);

router.get(
  "/:id/specializations",
  validator.paramsValidator,
  careerController.getCareerLevelSpecializations,
);

router.use(authorizedUser);

router.post(
  "/",
  multipartConfig,
  validator.careerValidator,
  careerController.createCareerLevel,
);

router.post(
  "/:id/specializations/:specializationId",
  validator.paramsValidator,
  careerController.addSpecializationToCareerLevel,
);

router.put(
  "/:id",
  multipartConfig,
  validator.paramsValidator,
  validator.careerValidator,
  careerController.updateCareerLevel,
);

router.delete(
  "/:id",
  validator.paramsValidator,
  careerController.deleteCareerLevel,
);

router.delete(
  "/:id/specializations/:specializationId",
  careerController.removeSpecializationFromCareerLevel,
);

module.exports = router;
