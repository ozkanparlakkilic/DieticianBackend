const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const Dietician = require("../models/dieticianModel.js");

// @route   POST /api/dietician/login
// @access  Public
const authDietician = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const dietician = await Dietician.findOne({ email });
  if (dietician && (await dietician.matchPassword(password))) {
    res.json({ user: dietician, token: generateToken(dietician._id) });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route   POST /api/dietician/register
// @access  Public
const registerDietician = asyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body;

  const dieticianExists = await Dietician.findOne({ email });

  if (dieticianExists) {
    res.status(400);
    throw new Error("Dietician already exists");
  }

  const dietician = await Dietician.create({
    fullName,
    email,
    password,
  });

  if (dietician) {
    res.status(201).json({
      dietician,
    });
  } else {
    res.status(400);
    throw new Error("Invalid dietician data");
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

module.exports = { authDietician, registerDietician };
