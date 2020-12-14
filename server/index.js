const aws = require("aws-sdk");
const multer = require("multer");
const express = require("express");
const app = express();
const morgan = require("morgan");
const multerS3 = require("multer-s3");
require("../data.js");

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
    bucket: "faceimages194107-mapboxdev",
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

app.get("/api/covid", (req, res, next) => {
  const geo = {
    type: "FeatureCollection",
    features: [],
  };
  const geoMap = covid.map((obj) => {
    if (obj.cases) {
      geo.features.push({
        type: "feature",
        geometry: {
          type: "Point",
          coordinates: [...obj.coordinates],
        },
        properties: {
          cases: obj.cases,
        },
      });
      return geo;
    }
  });
  res.json(geo);
});

app.post("/api/upload/:title", upload.single("photo"), (req, res, next) => {
  try {
    const client = new aws.Rekognition(config);

    /* list all the faces and delete all of them in a collection, this is not a function of the app, only for testing
    */
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
          Bucket: "faceimages194107-mapboxdev",
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
