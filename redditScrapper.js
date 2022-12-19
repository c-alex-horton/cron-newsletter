const puppeteer = require('puppeteer')
const fs = require('fs')
const cheerio = require('cheerio');


const scrapeReddit = async (url) => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage();

        const html = await page.goto(url).then(function () {
            return page.content();
        });

        const $ = cheerio.load(html, null, false)
        const posts = $('.Post')
        let headlines = []

        for (let i = 0; i < posts.length; i++) {
            let postWrapper = $(posts[i]).find('h3')[0], postTitle = $(postWrapper).text()
            let linkWrapper = $(posts[i]).find('a')[2], postLink = $(linkWrapper).attr('href')

            let post = {
                title: postTitle,
                link: postLink
            }
            headlines.push(post)
        }

        return headlines
    } catch (error) {
        console.log(error);
    }


}

module.exports = scrapeReddit

