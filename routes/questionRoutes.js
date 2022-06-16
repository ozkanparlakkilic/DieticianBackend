const express = require("express");
const router = express.Router();
const {
  addQuestion,
  getQuestions,
  updateQuestion,
} = require("../controllers/questionController");

router.post("/question", addQuestion);
router.get("/question", getQuestions);
router.put("/question/:id", updateQuestion);
// router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
// router.route("/profile").get(protect, teacher, getTeacherDetails);
// router
//   .route("/:id")
//   .get(protect, admin, getTeacherProfile)
//   .delete(protect, admin, deletedTeacher);
// router.get("/", getTeachers);
// router.route("/forgot/:id").put(protect, admin, updatePassword);
module.exports = router;
