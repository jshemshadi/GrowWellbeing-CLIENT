const express = require("express");

const router = express.Router();

router.get(/\/(.)*/, (req, res) => {
  res.render("index", {
    title: "Grow Wellbeing",
  });
});

module.exports = router;
