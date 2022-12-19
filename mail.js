const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const fns = require('date-fns')
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

        transporter.sendMail(
            {
                from: 'caleb@calebhorton.dev', // verified sender email
                to: process.env.RECIPIENT_EMAIL, // recipient email
                subject: `Node Newsletter `, // Subject line
                text: 'Test', // plain text body
                html: `<div>
                ${data.map(p => {
                    return (
                        `<div>
                            <h2>${p.title}</h2>
                            <a href="${p.link}">Link</a>
                        </div>`
                    )
                })}
                </div>`, // html body
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

