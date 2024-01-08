const Router = require("@koa/router");
const router = new Router();
const vacancyController = require("../controller/vacancy.js");
const validator = require("../middleware/validator.js");

router.get("/", validator.vacancyValidator, vacancyController.getVacancies);

module.exports = router;
