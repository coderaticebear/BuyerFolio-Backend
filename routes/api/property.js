const express = require("express");
const router = express.Router();
const Property = require("../../models/Property");
router.use(express.json());
const twilio = require('twilio');
const image_schema = require('../../models/test_col');
const { MongoClient, ObjectId } = require('mongodb');

// Route to get all properties
router.get("/", (req, res) => {
  Property.find()
    .then((properties) => {
      res.json(properties);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

// Route to get properties by location
router.get("/by-location/:location", (req, res) => {
  const location = req.params.location;

  Property.find({ location })
    .then((properties) => {
      res.json(properties);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});
// Image testing
router.get("/img/:id", async (req, res) => {
  const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';

  const client = new MongoClient(uri);
  await client.connect();

  const documentId = req.params.id;

  const dbName = 'test';
  const collectionName = 'test_col';
  const collection = client.db(dbName).collection(collectionName);

    // Retrieve the document by its ID
    const document = await collection.findOne({ _id: new ObjectId(documentId) });

    if (document && document.image) {
      // Set the appropriate headers for the response
      res.setHeader('Content-Type', 'text/plain');
      
      // Send the base64 image string as the response
      res.send(document.image);
    } else {
      res.status(404).send('Image not found');
    }

});
// function generateOTP() {
//     const digits = '0123456789';
//     let OTP = '';
//     for (let i = 0; i < 6; i++) {
//       OTP += digits[Math.floor(Math.random() * 10)];
//     }
//     return OTP;
//   }
  // Send OTP route
  

module.exports = router;
