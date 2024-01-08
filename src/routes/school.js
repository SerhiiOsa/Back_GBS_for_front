const Router = require("@koa/router");
const router = new Router();
const schoolController = require("../controller/school.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");

router.get("/:id", validator.paramsValitor, schoolController.getSingleSchool);

router.get("/", schoolController.getSchools);

router.get(
  "/:id/specializations",
  validator.paramsValitor,
  schoolController.getSchoolSpecializations,
);

router.use(authorizedUser);

router.post("/", validator.schoolValidator, schoolController.createSchool);

router.post(
  "/:id/specializations/:specializationId",
  validator.paramsValitor,
  schoolController.addSpecializationToSchool,
);

router.put(
  "/:id",
  validator.paramsValitor,
  validator.schoolValidator,
  schoolController.updateSchool,
);

router.delete("/:id", validator.paramsValitor, schoolController.deleteSchool);

router.delete(
  "/:id/specializations/:specializationId",
  schoolController.removeSpecializationFromSchool,
);

module.exports = router;
