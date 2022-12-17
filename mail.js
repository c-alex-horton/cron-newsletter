const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()


let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
    },
})