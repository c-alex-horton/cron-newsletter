const getRedditNews = require('./redditNewsScrapper')
const sendMail = require('./mail')

const main = async () => {
    console.log('Pulling data...')
    const data = await getRedditNews()
    console.log(data);
    console.log('Sending Email...');
    await sendMail(data)
    process.exit()
}

main()