const express = require("express");
const router = express.Router();
const Property = require("../../models/Property");
router.use(express.json());
const passport = require('passport');
router.use(passport.initialize());
const FacebookStrategy = require('passport-facebook').Strategy;
const twilio = require('twilio');
const axios = require('axios');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


router.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
  
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
  
      // Save the OTP in your database for verification later
  
    // Send the OTP via SMS
    const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    twilioClient.messages
      .create({
        body: `Hi Priyanka Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      })
      .then(() => {
        res.send('OTP sent successfully');
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        res.status(500).send('Error sending OTP');
      });
  });
  
  // Verify OTP route
  router.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;
  
    // Retrieve the saved OTP from your database for the provided phone number
    var savedOtp = 123456; 
    // Compare the provided OTP with the saved OTP
    if (otp === savedOtp) {
      // OTP is valid
      res.send('OTP verified successfully');
    } else {
      // OTP is invalid
      res.status(400).send('Invalid OTP');
    }
  });

  //Google login
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    // Handle user authentication logic here
    User.findOne({ googleId: profile.id }, async (err, existingUser) => {
      if (err) {
        return done(err);
      }
  
      if (existingUser) {
        // User already exists, proceed with authentication
        return done(null, existingUser);
      }
  
      // User does not exist, create a new user
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value
      });
  
      try {
        // Save the new user to the database
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    });
  }));
  
  // Routes
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Redirect or send a response after successful authentication
    res.send('Successfully authenticated with Google!');
  });

  //Facebook 

  passport.use(new FacebookStrategy({
    clientID: 'YOUR_FACEBOOK_APP_ID',
    clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // Here, you can handle the user data received from Facebook
    // Typically, you would save the user to your database or perform other operations
    console.log('Facebook profile:', profile);
    done(null, profile);
  }
));

// Configure routes
router.get('/', (req, res) => {
  res.send('<a href="/auth/facebook">Login with Facebook</a>');
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/' })
);


// Google maps

router.get('/address/:address', async (req, res) => {
    try {
      const address = req.params.address;
      const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=15&size=400x400&key=AIzaSyAXJKD-PTIHMVeEpsyUWX1NjvMwnF8Vl4w`;
      const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?location=${encodeURIComponent(address)}&size=400x400&key=AIzaSyAXJKD-PTIHMVeEpsyUWX1NjvMwnF8Vl4w`;
  
      // Make API requests to Google Maps API
      const [mapResponse, streetViewResponse] = await Promise.all([
        axios.get(mapUrl),
        axios.get(streetViewUrl)
      ]);
  
      // Get the image URLs from the API responses
      const mapImageUrl = mapResponse.request.res.responseUrl;
      const streetViewImageUrl = streetViewResponse.request.res.responseUrl;
  
      // Send the URLs as a response
      res.json({
        mapImageUrl,
        streetViewImageUrl
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  module.exports = router;
