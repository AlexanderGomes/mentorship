const User = require("../models/user");
const Project = require("../models/projects");
const service = require("../functionality/profile");
const Work = require("../models/work");
const asyncHandler = require("express-async-handler");

const getUserProfileData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
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
  const { projectId } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: req.body,
      },
      { new: true }
    ).select("-userId");
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

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const post = await Project.findByIdAndDelete(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const createWork = asyncHandler(async (req, res) => {
  const newWork = new Work(req.body);
  try {
    const savedWork = await newWork.save();
    res.status(200).json(savedWork);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const updateWork = asyncHandler(async (req, res) => {
  const { workId } = req.body;

  try {
    const updatedWork = await Work.findByIdAndUpdate(
      workId,
      {
        $set: req.body,
      },
      { new: true }
    ).select("-userId");

    res.status(200).json(updatedWork);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const deleteWork = asyncHandler(async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);
    res.status(200).json(work);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getWork = asyncHandler(async (req, res) => {
  try {
    const allWork = await Work.find({ userId: req.params.id }).select(
      "-userId"
    );
    res.status(200).json(allWork);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const searchUsers = asyncHandler(async (req, res) => {
  const query = req.query.q;
  const isMentor = req.query.isMentor;

  const terms = query.split(",").map((term) => term.trim());
  const searchRegex = new RegExp(terms.join("|"), "i");

  
  try {
    const results = await User.find({
      $or: [
        { name: searchRegex },
        { careerTitle: searchRegex },
        { languages: searchRegex },
        { frameworks: searchRegex },
        { libraries: searchRegex },
        { location: searchRegex },
        { tools: searchRegex },
        { others: searchRegex },
      ],
      isMentor: isMentor,
    });
    
    res.status(200).json(results);
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
  deleteProject,
  createWork,
  updateWork,
  deleteWork,
  getWork,
  searchUsers,
};
