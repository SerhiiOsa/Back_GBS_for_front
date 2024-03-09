const Router = require("@koa/router");
const router = new Router();
const schoolController = require("../controller/school.js");
const authorizedUser = require("../middleware/auth_user.js");
const validator = require("../middleware/validator.js");
const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");
const generateFilePath = require("./utils/file_path_generator.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "public/img/schools";
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
  validator.schoolValidator,
  upload.fields([{ name: "image" }]),
  schoolController.createSchool,
);

router.post(
  "/:id/specializations/:specializationId",
  validator.paramsValidator,
  schoolController.addSpecializationToSchool,
);

router.put(
  "/:id",
  validator.paramsValidator,
  validator.schoolValidator,
  upload.fields([{ name: "image" }]),
  schoolController.updateSchool,
);

router.delete("/:id", validator.paramsValidator, schoolController.deleteSchool);

router.delete(
  "/:id/specializations/:specializationId",
  schoolController.removeSpecializationFromSchool,
);

module.exports = router;
