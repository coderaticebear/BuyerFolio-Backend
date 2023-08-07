const express = require('express');
const router = express.Router();

//import model
const Prequalification = require('../../models/Prequalification');


//@type     -   GET
//@route    -   /api/pre
//@desc     -   Just for testing
//@access   -   PUBLIC
router.get('/', (req, res) => res.send('Prequalification related routes'))

//@type     -   GET
//@route    -   /api/pre/get
//@desc     -   Get all record
//@access   -   PUBLIC
router.get('/get',
async (req, res) => {
    
    // without cursor.
    const data = await Prequalification.find({});
    try {
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }

})

router.post('/addData', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            location,
            lookingToBuy,
            grossIncome,
            unit,
            debt,
            monthlyPayableAmount,
            downPayment,
            incomeSource,
            creditScore,
            monthlyRent,
            desiredRentOwnPayments
          } = req.body;
  
          const prequalification = new Prequalification({
            firstName,
            lastName,
            email,
            phoneNumber,
            location,
            lookingToBuy,
            grossIncome,
            unit,
            debt,
            monthlyPayableAmount,
            downPayment,
            incomeSource,
            creditScore,
            monthlyRent,
            desiredRentOwnPayments
          });
      
  
      await prequalification.save();
      //.then((pre) => {res.send(pre)});
  
      res.status(201).json({ success: 'true',message: 'Prequalification added successfully.', data: prequalification});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while saving the prequalification.' });
    }
  });
  
  // Shared variable to hold the data
let sharedData = {};
  
router.post('/primaryApplicant', async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        coBuyer,
        agreeToPromotionalEmails,
      } = req.body;
  
      sharedData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        coBuyer,
        agreeToPromotionalEmails,
      };
  
      res.status(201).json({ message: 'Primary Applicant data added successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while saving the Primary Applicant.' });
    }
  });

   
router.post('/futureHome', async (req, res) => {
  try {
  // Extract data from the request body
  const { location } = req.body;

  const data = {...sharedData, location};

    sharedData = data;
    res.status(201).json({ message: 'Data added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while saving the Future Home.' });
  }
});

router.post('/homeBuying', async (req, res) => {
  try {
  // Extract data from the request body
  const { lookingToBuy } = req.body;

  // Retrieve data from the shared variable and add the future home data
  const data = {...sharedData, lookingToBuy };
  sharedData = data;

    res.status(201).json({ message: 'Data added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while saving the Future Home.' });
  }
});
  
router.post('/income', async (req, res) => {
  try {
  // Extract data from the request body
  const {  grossIncome,
            unit,
            debt,
            monthlyPayableAmount, } = req.body;

  // Retrieve data from the shared variable and add the future home data
  const data = { ...sharedData,  grossIncome,
            unit,
            debt,
            monthlyPayableAmount, };

  sharedData = data;
  // Save the data to the database
  const finalData = new Prequalification(dataToSave);
  await finalData.save();

    res.status(201).json({ message: 'Data added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while saving the Future Home.' });
  }
});

router.post('/payments', async (req, res) => {
  try {
  // Extract data from the request body
  const {  downPayment } = req.body;

  // Retrieve data from the shared variable and add the future home data
  const data = { ...sharedData, downPayment };

  sharedData = data;

    res.status(201).json({ message: 'Data added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while saving the Future Home.' });
  }
});


router.post('/source', async (req, res) => {
  try {
  // Extract data from the request body
  const {  incomeSource } = req.body;

  // Retrieve data from the shared variable and add the future home data
  const data = { ...sharedData, incomeSource };

    sharedData = data;
    res.status(201).json({ message: 'Data added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while saving the Future Home.' });
  }
});


router.post('/creditScore', async (req, res) => {
  try {
  // Extract data from the request body
  const {  creditScore } = req.body;

  // Retrieve data from the shared variable and add the future home data
  const data = { ...sharedData, creditScore };

  sharedData = data;

    res.status(201).json({ message: 'Data added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while saving the Future Home.' });
  }
});
  
  
router.post('/rent', async (req, res) => {
  try {
  // Extract data from the request body
  const {  monthlyRent,
    desiredRentOwnPayments } = req.body;

  // Retrieve data from the shared variable and add the future home data
  const dataToSave = { ...sharedData,  monthlyRent,
    desiredRentOwnPayments };

  console.log(dataToSave)
  // Save the data to the database
  const finalData = new Prequalification(dataToSave);
  await finalData.save();

    res.status(201).json({ message: 'Data added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while saving the Future Home.' });
  }
});
  
 
 
  


module.exports = router;
