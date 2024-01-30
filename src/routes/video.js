const Router = require("@koa/router");
const router = new Router();
const videoController = require("../controller/video.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");
const multipartConfig = require("./utils/body_parser_config.js");

router.get("/:id", validator.paramsValidator, videoController.getSingleVideo);

router.get("/", videoController.getVideos);

router.get(
  "/:id/specializations",
  validator.paramsValidator,
  videoController.getVideoSpecializations,
);

router.use(authorizedUser);

router.post(
  "/",
  multipartConfig,
  validator.videoValidator,
  videoController.createVideo,
);

router.post(
  "/:id/specializations/:specializationId",
  validator.paramsValidator,
  videoController.addSpecializationToVideo,
);

router.put(
  "/:id",
  multipartConfig,
  validator.paramsValidator,
  validator.videoValidator,
  videoController.updateVideo,
);

router.delete("/:id", validator.paramsValidator, videoController.deleteVideo);

router.delete(
  "/:id/specializations/:specializationId",
  videoController.removeSpecializationFromVideo,
);

module.exports = router;
