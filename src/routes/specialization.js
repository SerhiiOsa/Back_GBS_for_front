const Router = require("@koa/router");
const router = new Router();
const specializationController = require("../controller/specialization.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");

router.get(
  "/:id",
  validator.paramsValitor,
  specializationController.getSingleSpecialization,
);

router.get(
  "/",
  validator.paramsValitor,
  specializationController.getSpecializationsOptionally,
);

router.get("/:id/schools", specializationController.getSpecializationSchools);

router.use(authorizedUser);

router.post(
  "/",
  validator.paramsValitor,
  validator.specializationValidator,
  specializationController.createSpecialization,
);

router.post(
  "/:id/schools/:schoolId",
  validator.paramsValitor,
  specializationController.addSchoolToSpecialization,
);

router.put(
  "/:id",
  validator.paramsValitor,
  validator.specializationValidator,
  specializationController.updateSpecialization,
);

router.delete(
  "/:id",
  validator.paramsValitor,
  specializationController.deleteSpecialization,
);

router.delete(
  "/:id/schools/:schoolId",
  specializationController.removeSchoolFromSpecialization,
);

module.exports = router;
