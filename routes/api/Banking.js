const express = require('express');
const router = express.Router();
const { PlaidApi, PlaidEnvironments, Configuration } = require('plaid');
require('dotenv').config()
const axios = require('axios');

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
      headers: {
          'PLAID-CLIENT-ID': '64b2c65f06f3230019641270',
          'PLAID-SECRET': 'd3443533bc5ac870ab4ca85df338af',
      },
  },
});



const plaidClient = new PlaidApi({configuration});

//@type     -   GET
//@route    -   /api/pre
//@desc     -   Just for testing
//@access   -   PUBLIC
router.post('/', (req, res) => res.send('Banking related routes'))


router.post('/create_link_token', async function (request, response) {
  const plaidRequest = {
      user: {
          client_user_id: 'user',
      },
      client_name: 'Plaid Test App',
      products: ['auth'],
      language: 'en',
      webhook: 'https://sample-web-hook.com', 
      redirect_uri: 'http://localhost:8080/api/bank/',
      country_codes: ['US'],
  };
  try {
    console.log("Try")
      const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
      response.json.send(createTokenResponse.data);
  } catch (error) {
      response.status(500).send("failure");
      console.log(error.message)
      // handle error
  }
});

router.post('/link_token', async (req, res) => {
  try {
    console.log("Hello")
    const linkToken = await generateLinkToken();
    res.send({ linkToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

const clientId = '64b2c65f06f3230019641270';
const secret = '195aeead670c122f14c9e986df44fb';
const redirect_uri = 'http://localhost:8080/api/bank/';

// Set the /link/token/create route
router.get('/link/token/create', async (req, res) => {
  try {
    // Set the API endpoint
    const url = 'https://plaid.com/link/token/create';

    // Set the headers
    const headers = {
      'Content-Type': 'application/json',
    };

    // Set the payload data
    const data = {
      client_id: clientId,
      secret: secret,
      redirect_uri: redirect_uri,
    };

    // Send the POST request to create a link_token
    const response = await axios.post(url, data, { headers });

    // Extract the link_token from the response
    const link_token = response.data.link_token;

    res.json({ link_token });
  } catch (error) {
    console.error('Error creating link_token:', error.response.data);
    res.status(500).json({ error: 'Error creating link_token' });
  }
});

module.exports = router;
