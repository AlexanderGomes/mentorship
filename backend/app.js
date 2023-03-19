const express = require("express");
const multer = require("multer");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cookieParser = require("cookie-parser");
const upload = multer();

//routes folders
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/verification");

//utils
const connectDB = require("./utils/connectDB");

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(upload.any());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log("db connected");
  console.log(`server on port ${port}`);
});
