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
    bucket: "faceimages194107-mapboxdev",
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


app.get('/api/covid', (req, res, next) => {
  const geo = {
    type: "FeatureCollection",
    features: []
  }
  const geoMap = covid.map(obj => {
    if(obj.cases) {
      geo.features.push({
        "type": "feature",
        "geometry": {
          "type": "Point",
          "coordinates": [...obj.coordinates]
        },
        "properties": {
          "cases": obj.cases
        }
      })
      return geo
    }
  })
  res.json(geo)
})

app.post("/api/upload", upload.single("photo"), (req, res, next) => {
  try {
    const client = new aws.Rekognition(config);

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
      } else if (data.FaceMatches.length === 0) {
        const paramsIndexFace = {
          CollectionId: "irelia-faces",
          DetectionAttributes: ["ALL"],
          Image: {
            S3Object: {
              Bucket: "faceimages194107-mapboxdev",
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

    // const params = {
    //   SourceImage: {
    //     S3Object: {
    //       Bucket: "faceimages142452-dev",
    //       Name: req.file.key,
    //     },
    //   },
    //   TargetImage: {
    //     S3Object: {
    //       Bucket: "faceimages142452-dev",
    //       Name: "public/7A8C0D65-C8AF-49EA-B881-9515D0451227.jpg",
    //     },
    //   },
    //   SimilarityThreshold: 0,
    // };

    // client.compareFaces(params, (err, data) => {
    //   if (err) {
    //     return res.json({ Similarity: 0 });
    //   }
    //   const face = data.FaceMatches[0];
    //   console.log(face);
    //   res.json(face);
    // });
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
