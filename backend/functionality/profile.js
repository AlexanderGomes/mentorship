require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const AWS = require("aws-sdk");
const User = require("../models/user");
const uuid = require("uuid");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.PRIVATE_KEY,
  region: "us-east-2",
});

const deletePrevious = async (location) => {
  const formateKey = location.split("/").pop();

  try {
    const params = {
      Bucket: "a2g-mentorship",
      Key: formateKey,
    };

    await s3.deleteObject(params).promise();
  } catch (error) {
    throw new Error(error.message);
  }
};

const s3 = new AWS.S3();

const uploadPhoto = async (editedImage, userId) => {
  const user = await User.findById(userId).select("profilePicture -_id");

  if (user.profilePicture) {
    await deletePrevious(user.profilePicture);
  }

  try {
    const imageData = Buffer.from(
      editedImage.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const photoId = uuid.v4();
    const photoParams = {
      Bucket: "a2g-mentorship",
      Key: `${photoId}.png`,
      Body: imageData,
      ContentType: "image/png",
    };

    const uploadedResult = await s3.upload(photoParams).promise();

    return uploadedResult.Location;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  uploadPhoto,
};
