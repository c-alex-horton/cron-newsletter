const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()


const sendMail = async (data) => {


    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY,
            },
        })

        const buffer = fs.readFileSync('./output.html')

        const html = buffer.toString()

        transporter.sendMail(
            {
                from: 'caleb@calebhorton.dev', // verified sender email
                to: process.env.RECIPIENT_EMAIL, // recipient email
                subject: `Node Newsletter `, // Subject line
                text: 'Please enable HTML to see this message', // plain text body
                html: html
            },
            (error) => {
                if (error) {
                    console.log(error)
                    reject(error)
                } else {
                    console.log('Email sent')
                    resolve(data)
                }
            }
        )
    })

}


module.exports = sendMail

