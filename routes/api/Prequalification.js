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
  
  
router.post('/addData1', async (req, res) => {
    try {
      const {
        firstName,
        lastName
      } = req.body;
  
      const prequalification = new Prequalification({
        firstName,
        lastName
      });
  
      await prequalification.save();
  
      res.status(201).json({ message: 'Prequalification added successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while saving the prequalification.' });
    }
  });
  


module.exports = router;
