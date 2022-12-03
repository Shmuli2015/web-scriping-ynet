//npm dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

//start express
const app = express();

//get data from ynet
const siteUrl = "https://www.ynet.co.il/home/0,7340,L-8,00.html";
axios(siteUrl)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const articles = [];

    // get news title sub title and url
    $(".slotTitle", html).each((inx, elm) => {
      const title = $(elm).find("span").text();
      const subTitle = $(elm).siblings(".slotSubTitle").text();
      const url = $(elm).parent().attr("href");
      if (title != "" && subTitle != "" && url != undefined) {
        const article = {
          id: inx,
          title,
          subTitle,
          url,
        };
        articles.push(article);
      }
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

//listen to the server
const PORT = "8000";
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
