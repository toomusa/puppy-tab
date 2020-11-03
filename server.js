const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.get("/scrape", async (req, res) => {
  console.log("server hit");
  const names = [];
  try {
    const scrapedContent = await axios.get("https://gailsdoodles.com/current-litters")
    let $ = cheerio.load(scrapedContent.data)
    $('.sqs-row').find('h1').each(function (node) {
      names.push($(this).text())
    });
    console.log(names);
    res.send(names);
  } catch (e) {
    console.log(e);
    return e;
  }
});

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {console.log("Server listening on http://localhost:" + PORT)});