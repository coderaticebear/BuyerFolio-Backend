const mongoose = require('mongoose');

const prequalificationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    coBuyer: { type: Boolean, default: false }, // Co-buyer checkbox value
    agreeToPromotionalEmails: { type: Boolean, default: true }, // Promotional emails checkbox value
    location: String,
    lookingToBuy: String,
    grossIncome: Number,
    unit: String,
    debt: Number,
    monthlyPayableAmount: Number,
    downPayment: String,
    incomeSource: String,
    creditScore: String,
    monthlyRent: Number,
    desiredRentOwnPayments: Number
});

const Prequalification = mongoose.model('Prequalification', prequalificationSchema);

module.exports = Prequalification;
