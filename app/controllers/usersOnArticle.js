'use strict';

/**
 * Module dependencies.
 */

const { wrap: async } = require('co');

/**
 * Load comment
 */

exports.load = function(req, res, next, id) {
  req.assignedUsers = req.article.assignedUsers.find(assignedUser => {
    assignedUser.id === id;
  });

  if (!req.assignedUser) return next(new Error('Comment not found'));
  next();
};

/**
 * Create comment
 */

exports.create = async(function*(req, res) {
  const { user, article } = req;
  yield article.assignUser(req.user, req.body);

  const affiliateUrl = '/assignUser/' + article._id + '/' + user.id;
  req.affiliateUrl = affiliateUrl;

  res.render('articles/show', {
    title: req.article.title,
    article: req
  });
});

/**
 * Update view count
 */

exports.goToArticle = async(function(req, res) {
  const { user, article } = req;
  const assignedUser = req.article.assignedUsers.find(assignedUser => {
    return String(assignedUser.user) === String(user.id);
  });
  let viewCount = Number(assignedUser.viewCount);
  viewCount++;
  const upatedViewCount = String(viewCount);
  assignedUser.viewCount = upatedViewCount;

  req.article.assignedUsers = [assignedUser];

  article.save();

  res.redirect(`/articles/${article._id}`);
});

/**
 * Get view count
 */

exports.view = async(function(req, res) {
  res.send(req.article.assignedUsers);
});

/**
 * Delete comment
 */

exports.destroy = async(function*(req, res) {
  yield req.article.removeComment(req.params.commentId);
  req.flash('info', 'Removed comment');
  res.redirect(`/articles/${req.article.id}`);
});
