const PORT = "8000";
const axios = require("axios");
const cheerio = require("cheerio");
const { log } = require("console");
const express = require("express");

const app = express();
const siteUrl = "https://www.ynet.co.il/home/0,7340,L-8,00.html";

axios(siteUrl)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const articles = [];
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

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
