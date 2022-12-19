const handlebars = require('handlebars')
const mjml2html = require('mjml')
const fs = require('fs')

const renderToString = async (source, data) => {
    return new Promise((resolve, reject) => {
        const template = handlebars.compile(source)
        const outputString = template(data)
        const mjml = mjml2html(outputString)

        console.log(mjml);

        fs.writeFile('output.html', mjml.html, (err) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log('Data > output.html');
                resolve(true)
            }
        })
    })
}


const genHtml = async (input) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./template.hbs', async (err, data) => {
            if (!err) {
                const source = data.toString()

                await renderToString(source, input)
                resolve(true)
            } else {
                console.log(err);
                reject(err)
            }
        })
    })
}

module.exports = genHtml