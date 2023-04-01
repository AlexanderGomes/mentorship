const User = require("../models/user");
const Project = require("../models/projects");
const asyncHandler = require("express-async-handler");
const service = require("../functionality/profile");

const getUserProfileData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -_id");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "user not found" });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId, profilePic } = req.body.data;

  let newPicture;

  if (profilePic) {
    newPicture = await service.uploadPhoto(profilePic, userId);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body.data, profilePicture: newPicture && newPicture },
      { new: true }
    ).select("-password -_id");
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
});

const createProject = asyncHandler(async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.body.data;

  try {
    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      $set: req.body.data,
    }).select("-userId");
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getProject = asyncHandler(async (req, res) => {
  try {
    const allProjects = await Project.find({ userId: req.params.id }).select(
      "-userId"
    );
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = {
  updateUserProfile,
  getUserProfileData,
  createProject,
  updateProject,
  getProject,
};
