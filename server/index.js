const aws = require("aws-sdk");
const multer = require("multer");
const express = require("express");
const app = express();
const morgan = require("morgan");
const multerS3 = require("multer-s3");

require("../secrets");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCCESS_KEY,
  region: "us-east-1",
});

const config = new aws.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCCESS_KEY,
  region: "us-east-1",
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "faceimages01017-devdynamo",
    acl: "public-read",
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, req.params.name + Date.now().toString() + ".png");
    },
  }),
});

app.use(morgan("dev"));


app.post("/api/upload", upload.single("photo"), (req, res, next) => {
  try {
    const client = new aws.Rekognition(config);
    const searchFacesParams = {
      CollectionId: "irelia-faces",
      FaceMatchThreshold: 75,
      Image: {
        S3Object: {
          Bucket: "faceimages01017-devdynamo",
          Name: req.file.key,
        },
      },
      MaxFaces: 5,
    };

    client.searchFacesByImage(searchFacesParams, function (err, data) {
      if (err) {
        console.log(err);
        res.send([]);
      } else if (data.FaceMatches.length === 0) {

        const paramsIndexFace = {
          CollectionId: "irelia-faces",
          DetectionAttributes: ["ALL"],
          Image: {
            S3Object: {
              Bucket: "faceimages01017-devdynamo",
              Name: req.file.key,
            },
          },
        };
        client.indexFaces(paramsIndexFace, (err, data) => {
          if (err) console.log(err, err.stack);
          else {
            console.log(data);
            res.send([]);
          }
        });
      } else {
        console.log(data.FaceMatches);
        res.send(data.FaceMatches);
      }
    });

  } catch (err) {
    next(err);
  }
  // console.log("FILE", req.file);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});

// const paramsCollection = {
//   CollectionId: "irelia-faces",
// };
// const client = new aws.Rekognition(config);
// client.createCollection(paramsCollection, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });
