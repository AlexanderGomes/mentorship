const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json("user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const tokens = generateTokens(user);

  // Create secure cookie with refresh token
  res.cookie("jwt", tokens.refreshToken, {
    httpOnly: true,
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json(tokens.accessToken);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const tokens = generateTokens(user);

    // Create secure cookie with refresh token
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: false, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles
    res.json(tokens.accessToken);
  } else {
    res.status(400).json("Invalid credentials");
  }
});

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json("Unauthorized");

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
    if (err) return res.status(403).json("Forbidden");

    const user = await User.findOne({
      _id: decoded.id,
    }).exec();

    if (!user) return res.status(401).json("Unauthorized");

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "2m" }
    );

    res.json(accessToken);
  });
};

const testRoute = async (req, res) => {
  res.send("protected route allowed");
};

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id.toString(),
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id.toString() },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "1m",
    }
  );

  return { accessToken, refreshToken };
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  registerUser,
  loginUser,
  refresh,
  testRoute,
  logout,
};
