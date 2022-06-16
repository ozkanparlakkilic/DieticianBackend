const express = require("express");
const connectDB = require("./config/connectDB");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// import adminRoutes from "./routes/adminRoutes.js";
// import classRoutes from "./routes/classRoutes.js";
// import teacherRoutes from "./routes/teacherRoutes.js";
// import studentRoutes from "./routes/studentRoutes.js";
const userRoutes = require("./routes/userRoutes.js");
const dieticianRoutes = require("./routes/dieticianRoutes.js");
const questionRoutes = require("./routes/questionRoutes");
const programRoutes = require("./routes/programRoutes");

dotenv.config();
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/dietician", dieticianRoutes);
app.use("/api/user", questionRoutes);
app.use("/api/user", programRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 8000;

app.listen(PORT);
