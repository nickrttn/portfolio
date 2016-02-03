'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const router = express.Router();

let articles = require('../articles/articles.json').articles;

/* if someone requests /work, just render the homepage. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Nick Rutten',
    articles: articles
  });
});

router.get('/:article', function(req, res, next) {
  findBySlug(articles, req.params.article, (article) => {
    let fn = path.join(__dirname, '../articles/' + article.filename);
    console.log(fn);
    fs.readFile(fn, (err, data) => {
      if (err) next();
      res.render('article', {
        title: article.title,
        date: article.date,
        body: data.toString(),
        marked: marked
      });
    });
  });
});

function findBySlug(arr, slug, cb) {
  arr.forEach(function(article) {
    if(article.slug === slug) {
      cb(article);
    }
  });
}

// router.get('/:slug', function(req, res) {
// 	client.entries({ content_type: '2wKn6yEnZewu2SCCkus4as', 'fields.slug': req.params.slug })
// 		.then(function(entries) {
// 			res.render('portfolio/post.ejs', {
// 				postTitle: entries[0].fields.title,
// 				featuredImage: entries[0].fields.featuredImage,
// 				body: marked(entries[0].fields.body),
// 				categories: entries[0].fields.category,
// 				tags: entries[0].fields.tags
// 			});
// 		});
// });

module.exports = router;
