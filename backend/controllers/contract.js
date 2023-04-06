const asyncHandler = require("express-async-handler");
const Contract = require("../models/contract");
const { findByIdAndDelete } = require("../models/user");

const createContract = asyncHandler(async (req, res) => {
  const newContract = new Contract(req.body);
  try {
    const savedContract = await newContract.save();
    res.status(200).json(savedContract);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const Decide = asyncHandler(async (req, res) => {
  const { yes, contractId } = req.body;

  try {
    if (yes) {
      const updated = await Contract.findByIdAndUpdate(contractId, {
        $set: { isAccepted: true },
      });
      return res.status(200).json(updated);
    } else {
      return await findByIdAndDelete(contractId);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getAll = asyncHandler(async (req, res) => {
  const { isMentor, id } = req.query;
  try {
    if (isMentor) {
      const contracts = await Contract.find({ mentorId: id });
      res.status(200).json(contracts);
    } else {
      const contracts = await Contract.find({ userId: id });
      res.status(200).json(contracts);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = {
  createContract,
  Decide,
  getAll,
};
