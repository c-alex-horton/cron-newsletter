const scrapeReddit = require('./redditScrapper')
const sendMail = require('./mail')
const genHtml = require('./genNewsletter')
const url = 'https://www.reddit.com/r/news'
const fns = require('date-fns')

const main = async () => {
    console.log('Pulling data...')
    const scrape = await scrapeReddit(url)
    const data = {
        sections: [
            {
                name: 'News',
                posts:
                    [
                        ...scrape
                    ]
            }
        ]
    }
    await genHtml(data)
    console.log('Sending Email...');
    await sendMail(data)
    process.exit()
}

main()