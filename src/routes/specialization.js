const Router = require("@koa/router");
const router = new Router();
const specializationController = require("../controller/specialization.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");

router.get(
  "/:id",
  validator.paramsValidator,
  specializationController.getSingleSpecialization,
);

router.get(
  "/",
  validator.paramsValidator,
  specializationController.getSpecializationsOptionally,
);

router.get("/:id/schools", specializationController.getSpecializationSchools);

router.use(authorizedUser);

router.post(
  "/",
  validator.paramsValidator,
  validator.specializationValidator,
  specializationController.createSpecialization,
);

router.post(
  "/:id/schools/:schoolId",
  validator.paramsValidator,
  specializationController.addSchoolToSpecialization,
);

router.put(
  "/:id",
  validator.paramsValidator,
  validator.specializationValidator,
  specializationController.updateSpecialization,
);

router.delete(
  "/:id",
  validator.paramsValidator,
  specializationController.deleteSpecialization,
);

router.delete(
  "/:id/schools/:schoolId",
  specializationController.removeSchoolFromSpecialization,
);

module.exports = router;
