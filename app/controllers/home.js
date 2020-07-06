const mongoose = require('mongoose');
// const { wrap: async } = require('co');
// const only = require('only');
const Article = mongoose.model('Article');
// const assign = Object.assign;

/**
 * Load
 */

exports.index = function(req, res) {
  res.render('index', {
    title: 'Home',
    article: new Article()
  });
};
