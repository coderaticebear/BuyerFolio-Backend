const express = require("express");
const router = express.Router();
const Property = require("../../models/Property");
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');

// Fetch the access token from the MLS API
const fetchAccessToken = async () => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('grant_type', 'client_credentials');
  encodedParams.set('app_client_id', '118po0r6i1o1ccsu6ee4cl132u');

  const options = {
    method: 'POST',
    url: 'https://mls-router1.p.rapidapi.com/cognito-oauth2/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'e84d76ac2bmshb57385088281c3cp13482bjsn982bdeff5ddd',
      'X-RapidAPI-Host': 'mls-router1.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch access token from MLS API');
  }
};

// Middleware to parse JSON in the request body
router.use(express.json());

// Route to get the access token
router.get('/get-access-token', async (req, res) => {
  try {
    const accessToken = await fetchAccessToken();
    res.json({ accessToken });
    console.log(accessToken.access_token);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
});

// Route to get the top properties
router.get('/top-properties', async (req, res) => {
  try {
    // Fetch the access token from the /get-access-token endpoint
    const { data: { accessToken } } = await axios.get('http://localhost:8080/api/property/get-access-token');

    // Make the API call to the MLS API with the access token in the Authorization header
    const options = {
      method: 'GET',
      url: 'https://mls-router1.p.rapidapi.com/reso/odata/Property',
      params: {
        orderby: 'ModificationTimestamp desc',
        top: '10'
      },
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`, // Use the access token in the Authorization header
        'x-api-key': 'a50YsdAcOQ6xyDqVYTzEB57jBqKVYV01MyTD4at6',
        'X-RapidAPI-Key': 'e84d76ac2bmshb57385088281c3cp13482bjsn982bdeff5ddd',
        'X-RapidAPI-Host': 'mls-router1.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch top properties' });
  }
});

// Route to get all properties
router.get("/", (req, res) => {
  Property.find()
    .then((properties) => {
      console.log(properties);
      res.json(properties);
    })
    .catch((error) => {
      console.error(error);
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

// Route to get properties with specific filter criteria
router.get("/filter", (req, res) => {
  const { pool, garage, no_of_bed, no_of_bath } = req.query;
  const filter = {};

  if (pool === 'true') {
    filter.pool = true;
  }

  if (garage === 'true') {
    filter.garage = true;
  }

  if (no_of_bed) {
    filter.no_of_bed = parseInt(no_of_bed);
  }
  
  if (no_of_bath) {
    filter.no_of_bath = parseInt(no_of_bath);
  }
  Property.find(filter)
    .then((properties) => {
      res.json(properties);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

// Route to get recently sold properties
router.get("/recently-sold", (req, res) => {
  const daysAgo = 9; // Number of days ago to consider properties as recently sold
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

  console.log("Cutoff Date:", cutoffDate);

  Property.find({ isSold: true, /*soldDate: { $gte: cutoffDate }*/ })
    .then((properties) => {
      console.log("Recently Sold Properties:", properties);
      console.log("Number of Recently Sold Properties:", properties.length);
      res.json(properties);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Route to retrieve an image by ID
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

module.exports = router;
