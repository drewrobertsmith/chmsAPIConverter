const axios = require("axios");
require("dotenv").config();
var express = require("express");
var router = express.Router();
const xmls2js = require("xml2js");
const parser = new xmls2js.Parser({ explicitArray: false });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/events", (req, res, next) => {
  console.log("'/events' call");
  axios
    .get(process.env.BASE_URL, {
      params: {
        srv: "event_profiles",
        modified_since: "2024-10-01",
        include_image_link: true,
        //per_page: 5,
      },
      auth: {
        username: "drewrobertsmith",
        password: process.env.PASS,
      },
    })
    .then((data) => {
      parser.parseString(data.data, (err, result) => {
        if (err) next(err);
        res.json(result);
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
