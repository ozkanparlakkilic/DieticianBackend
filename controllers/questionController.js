const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");

// @route   POST /api/user/login
// @access  Public
const addQuestion = asyncHandler(async (req, res) => {
  const { question, user } = req.body;

  const newQuestion = await Question.create({
    question,
    user: user._id,
    isAnswered: false,
  });

  if (newQuestion) {
    res.status(201).json({
      newQuestion,
    });
  } else {
    res.status(400);
    throw new Error("Invalid question data");
  }
});

// api/user/question
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({ isAnswered: false }).populate("user");
  res.json(questions);
});

// @route   PUT /api/question/:id
const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByIdAndUpdate(
    req.params.id,
    { isAnswered: true },
    { isNew: true }
  );

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// // @route   GET /api/teacher/:id
// // @access  Private/Admin
// const getTeachers = asyncHandler(async (req, res) => {
//   const teachers = await Teacher.find({}).populate("admin", "empId fullname");
//   res.json(teachers);
// });

// // @route   Get /api/teacher/profile
// // @access  Private
// const getTeacherDetails = asyncHandler(async (req, res) => {
//   const teacher = await Teacher.findById(req.teacher._id).select("-password");
//   if (teacher) {
//     res.json(teacher);
//   } else {
//     res.status(404);
//     throw new Error("Teacher not Found");
//   }
// });

// // @route   PUT /api/teacher/forgot/:id
// // @access  Private/Admin
// const updatePassword = asyncHandler(async (req, res) => {
//   const { password } = req.body;

//   const teacher = await Teacher.findById(req.params.id);

//   if (teacher) {
//     teacher.password = password;

//     const updatedPassword = await teacher.save();
//     res.json(updatedPassword);
//   } else {
//     res.status(404);
//     throw new Error("Teacher not found");
//   }
// });

// // @route   GET /api/teacher/:id
// // @access  Private
// const getTeacherProfile = asyncHandler(async (req, res) => {
//   const teacher = await Teacher.findById(req.params.id).populate(
//     "admin",
//     "empId fullName"
//   );

//   if (teacher) {
//     res.json({
//       teacher,
//     });
//   } else {
//     res.status(404);
//     throw new Error("Teacher not found");
//   }
// });

// // @route   DELETE /api/teacher/:id
// // @access  Private
// const deletedTeacher = asyncHandler(async (req, res) => {
//   const teacher = await Teacher.findById(req.params.id);

//   if (teacher) {
//     await teacher.remove();
//     res.json({ message: "Teacher removed by admin" });
//   } else {
//     res.status(404);
//     throw new Error("Teacher not found");
//   }
// });

module.exports = { addQuestion, getQuestions, updateQuestion };
