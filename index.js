const getRedditNews = require('./redditNewsScrapper')

const main = async () => {
    console.log('Pulling data...')
    const data = await getRedditNews()
    console.log(data);
    process.exit()
}

main()