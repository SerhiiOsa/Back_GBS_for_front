const Router = require("@koa/router");
const router = new Router();
const schoolController = require("../controller/school.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");
const multipartConfig = require("./utils/body_parser_config.js");

router.get("/:id", validator.paramsValidator, schoolController.getSingleSchool);

router.get("/", schoolController.getSchools);

router.get(
  "/:id/specializations",
  validator.paramsValidator,
  schoolController.getSchoolSpecializations,
);

router.use(authorizedUser);
router.post(
  "/",
  multipartConfig,
  validator.schoolValidator,
  schoolController.createSchool,
);

router.post(
  "/:id/specializations/:specializationId",
  validator.paramsValidator,
  schoolController.addSpecializationToSchool,
);

router.put(
  "/:id",
  multipartConfig,
  validator.paramsValidator,
  validator.schoolValidator,
  schoolController.updateSchool,
);

router.delete("/:id", validator.paramsValidator, schoolController.deleteSchool);

router.delete(
  "/:id/specializations/:specializationId",
  schoolController.removeSpecializationFromSchool,
);

module.exports = router;
