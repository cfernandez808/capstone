const aws = require("aws-sdk");
const multer = require("multer");
const express = require("express");
const app = express();
const morgan = require("morgan");
const multerS3 = require("multer-s3");
require('../data.js')

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
    bucket: "faceimages00139-mbtester",
    acl: "public-read",
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, req.params.title);
    },
  }),
});

app.use(morgan("dev"));

app.get('/api/covid', (req, res, next) => {
  res.json(covid)
})

app.post("/api/upload:title", upload.single("photo"), (req, res, next) => {
  try {
    const client = new aws.Rekognition(config);

    // list all the faces in a collection
    // const listFacesParams = {
    //   CollectionId: "irelia-faces"
    // };

    // client.listFaces(listFacesParams, (err, data) => {
    //   if(err) console.log(err, err.stack);
    //   else {
    //     console.log("data from listFaces", data["Faces"]);
    //     // delete faces
    //     data["Faces"].map(face => {
    //       const faceId = face["FaceId"];
    //       console.log(faceId);
    //       const deleteFaceParams = {
    //         CollectionId: "irelia-faces",
    //         FaceIds: [faceId]
    //       }
    //       client.deleteFaces(deleteFaceParams, (err, data) => {
    //         if(err) console.log(err, err.stack);
    //         else console.log("deleted face", data);
    //       })
    //     })
    //   }
    // })

    const searchFacesParams = {
      CollectionId: "irelia-faces",
      FaceMatchThreshold: 75,
      Image: {
        S3Object: {
          Bucket: "faceimages00139-mbtester",
          Name: req.file.key,
        },
      },
      MaxFaces: 5,
    };

    client.searchFacesByImage(searchFacesParams, function (err, data) {
      if (err) {
        console.log(err);
        res.send([]);
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

