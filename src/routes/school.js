const Router = require("@koa/router");
const router = new Router();
const schoolController = require("../controller/school.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");

router.get("/:id", schoolController.getSingleSchool);

router.get("/", schoolController.getSchools);

router.use(authorizedUser);

router.post("/", validator.schoolValidator, schoolController.createSchool);

router.put("/:id", validator.schoolValidator, schoolController.updateSchool);

router.delete("/:id", schoolController.deleteSchool);

module.exports = router;
