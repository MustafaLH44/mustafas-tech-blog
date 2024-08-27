const router = require('express').Router();
const { Post, User } = require('../models');

// GET / - Homepage
router.get('/homepage', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('/homepage.handlebars', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard.handlebars');
    return;
  }

  res.render('/login.handlebars');
});

// GET /signup
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/signup.handlebars');
    return;
  }

  res.render('signup');
});

module.exports = router;
