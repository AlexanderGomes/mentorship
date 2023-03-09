const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logger");

//routes folders
const userRoutes = require("./routes/user");

//utils
const connectDB = require("./utils/connectDB");

//middleware
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);

app.use(errorHandler);

app.listen(port, async () => {
  await connectDB();
  console.log("db connected");
  console.log(`server on port ${port}`);
});
