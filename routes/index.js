'use strict';

const express = require('express');
let router = express.Router();

let articles = require('../articles/articles.json').articles;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Nick Rutten',
    articles: articles
  });
});

module.exports = router;
