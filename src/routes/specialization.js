const Router = require("@koa/router");
const router = new Router();
const specializationController = require("../controller/specialization.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");
const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");
const generateFilePath = require("./utils/file_path_generator.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "public/img/specializations";
    const filePath = generateFilePath(uploadPath, file.originalname);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    cb(null, path.dirname(filePath));
  },

  filename: function (req, file, cb) {
    const uniqueIdentifier = Date.now();
    const fileName = `${uniqueIdentifier}_${file.originalname}`;
    const sanitizedFileName = fileName.replace(/\s/g, "_");
    cb(null, sanitizedFileName);
  },
});

const upload = multer({
  storage: storage,
  limits: "5mb",
});

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

router.get("/:id/videos", specializationController.getSpecializationVideos);

router.get(
  "/:id/career",
  specializationController.getSpecializationCareerLevels,
);

router.use(authorizedUser);

router.post(
  "/",
  validator.paramsValidator,
  validator.specializationValidator,
  upload.fields([{ name: "image" }]),
  specializationController.createSpecialization,
);

router.post(
  "/:id/schools/:schoolId",
  validator.paramsValidator,
  specializationController.addSchoolToSpecialization,
);

router.post(
  "/:id/videos/:videoId",
  validator.paramsValidator,
  specializationController.addVideoToSpecialization,
);

router.post(
  "/:id/career/:careerLevelId",
  validator.paramsValidator,
  specializationController.addCareerLevelToSpecialization,
);

router.put(
  "/:id",
  validator.paramsValidator,
  validator.specializationValidator,
  upload.fields([{ name: "image" }]),
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

router.delete(
  "/:id/videos/:videoId",
  specializationController.removeVideoFromSpecialization,
);

router.delete(
  "/:id/career/:careerLevelId",
  specializationController.removeCareerLevelFromSpecialization,
);

module.exports = router;
