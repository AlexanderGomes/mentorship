const express = require("express");
const multer = require("multer");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const cookieParser = require("cookie-parser");
const upload = multer();

//routes folders
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const stripeRoutes = require("./routes/stripe");

//utils
const connectDB = require("./utils/connectDB");

//middleware
app.use(cookieParser());
app.use(upload.any());
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(cors(corsOptions));


app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next();
  } else {
    express.json({ limit: "10mb" })(req, res, next);
  }
});

app.use("/api/user", authRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/functions", userRoutes);


app.listen(port, async () => {
  await connectDB();
  console.log("db connected");
  console.log(`server on port ${port}`);
});
