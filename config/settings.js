require('dotenv').config()

module.exports = {
    mongoURL: process.env.DB,
    secret:process.env.SECRET
}