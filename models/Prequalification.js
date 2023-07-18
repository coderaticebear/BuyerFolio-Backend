    const mongoose = require('mongoose');

    const prequalificationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
        validator: function(value) {
            // Regular expression to validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message: props => `${props.value} is not a valid email format`
        }
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    lookingToBuy: {
        type: String,
        enum: ['As soon as possible', '1-2 months', '3-4 months', '4+ months', 'Not Sure'],
        required: [true, 'Looking to buy field is required']
    },
    grossIncome: {
        type: Number,
        required: [true, 'Gross income is required'],
        min: [0, 'Gross income cannot be negative']
    },
    unit: {
        type: String,
        enum: ['Per Month', 'Per Year'],
        required: [true, 'Gross income unit is required']
    },
    debt: {
        type: Number,
        required: [true, 'Debt is required'],
        min: [0, 'Debt cannot be negative']
    },
    monthlyPayableAmount: {
        type: Number,
        required: [true, 'Monthly payable amount is required'],
        min: [0, 'Monthly payable amount cannot be negative']
    },
    downPayment: {
        type: String,
        enum: ['Nothing right now', 'Less than $5k', '$5-$10k', '$10-$20k', '$20k+'],
        required: [true, 'Down Payment field is required']
    },
    incomeSource: {
        type: String,
        enum: ['Traditional Employment', 'Self Employed', 'Pension and Disability Incomes', 'Alimony and Child Support', 'others'],
        required: [true, 'Down Payment field is required']
    },
    creditScore: {
        type: String,
        enum: ['Under 500', '500-600', '600-680', '680+', 'Not Sure'],
        required: [true, 'Down Payment field is required']
    },
    monthlyRent: {
        type: Number,
        required: [true, 'Monthly rent is required'],
        min: [0, 'Monthly rent cannot be negative']
    },
    desiredRentOwnPayments: {
        type: Number,
        required: [true, 'Desired rent-own monthly payments is required'],
        min: [0, 'Desired rent-own monthly payments cannot be negative']
    }
    });

    const Prequalification = mongoose.model('Prequalification', prequalificationSchema);

    module.exports = Prequalification;
