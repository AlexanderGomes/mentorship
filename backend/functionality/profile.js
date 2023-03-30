const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;


AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.PRIVATE_KEY,
  region: "us-east-2",
});

const s3 = new AWS.S3();

const uploadPhoto = async (editedImage, userId) => {
  try {
    const imageData = Buffer.from(
      editedImage.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const photoParams = {
      Bucket: "a2g-mentorship",
      Key: `photos/${userId}.png`,
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
