const Router = require("@koa/router");
const router = new Router();
const videoController = require("../controller/video.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");

router.get("/:id", validator.paramsValidator, videoController.getSingleVideo);

router.get("/", videoController.getVideos);

router.use(authorizedUser);

router.post("/", validator.videoValidator, videoController.createVideo);

router.put(
  "/:id",
  validator.paramsValidator,
  validator.videoValidator,
  videoController.updateVideo,
);

router.delete("/:id", validator.paramsValidator, videoController.deleteVideo);

module.exports = router;
