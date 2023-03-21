const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.PRIVATE_KEY,
  region: "us-east-2",
});

const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();

const verifyIdendity = asyncHandler(async (req, res) => {
  const photoFile = req.files[0];
  const documentFile = req.files[1];

  const photoParams = {
    Bucket: "a2g-mentorship",
    Key: `photos/${photoFile.originalname}`,
    Body: photoFile.buffer,
  };

  const documentParams = {
    Bucket: "a2g-mentorship",
    Key: `documents/${documentFile.originalname}`,
    Body: documentFile.buffer,
  };

  try {
    const [photoResult, documentResult] = await Promise.all([
      s3.upload(photoParams).promise(),
      s3.upload(documentParams).promise(),
    ]);

    const photoS3Object = {
      Bucket: "a2g-mentorship",
      Name: photoResult.Key,
    };

    const documentS3Object = {
      Bucket: "a2g-mentorship",
      Name: documentResult.Key,
    };

    const params = {
      SourceImage: {
        S3Object: photoS3Object
      },
      TargetImage: {
        S3Object: documentS3Object
      },
      SimilarityThreshold: 80 // Adjust as per your needs
    }

    const result = await rekognition.compareFaces(params).promise();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = {
  verifyIdendity,
};
