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
const stripeRoutes = require("./routes/stripe");

//utils
const connectDB = require("./utils/connectDB");

//middleware
app.use(cookieParser());
app.use(upload.any());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stripe", stripeRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log("db connected");
  console.log(`server on port ${port}`);
});
