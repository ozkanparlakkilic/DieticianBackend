const asyncHandler = require("express-async-handler");
const Program = require("../models/programModel");
const Question = require("../models/questionModel");
const User = require("../models/userModel.js");

// @route   POST /api/user/program
// @access  Public
const addProgram = asyncHandler(async (req, res) => {
  const { program, user, dietician } = req.body;

  const newProgram = await Program.create({
    program,
    user: user._id,
    dietician: dietician._id,
  });

  if (newProgram) {
    res.status(201).json({
      newProgram,
    });
  } else {
    res.status(400);
    throw new Error("Invalid program data");
  }
});

// api/user/program/:id
const getPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find({ user: req.params.id })
    .populate("user")
    .populate("dietician");
  res.json(programs);
});

// @route   PUT /api/question/:id
// const updateQuestion = asyncHandler(async (req, res) => {
//   const question = await Question.findById(req.params.id);

//   if (question) {
//     question.isAnswered = true;
//     res.json(question);
//   } else {
//     res.status(404);
//     throw new Error("Teacher not found");
//   }
// });

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

module.exports = { addProgram, getPrograms };
