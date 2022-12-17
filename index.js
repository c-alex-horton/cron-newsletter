// const rp = require('request-promise')
const puppeteer = require('puppeteer')
const url = 'https://www.reddit.com/r/news'
const fs = require('fs')
const cheerio = require('cheerio');

puppeteer
    .launch()
    .then((browser) => {
        return browser.newPage();
    })
    .then((page) => {
        return page.goto(url).then(function () {
            return page.content();
        });
    })
    .then((html) => {
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



        console.log(headlines)
        // fs.writeFile('output.txt', headlines, function (err) {
        //     if (err) return console.log(err);
        //     console.log('headlines > output.txt');
        // });

    }).then(() => process.exit())
    .catch(function (err) {
        console.log(err);
        process.exit()
    });