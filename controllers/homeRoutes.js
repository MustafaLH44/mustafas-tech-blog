const router = require('express').Router();
const { Post, User } = require('../models');

// GET / - Homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('/', {
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
    res.redirect('/homepage');
    return;
  }

  res.render('/login');
});

// GET /signup
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/signup');
    return;
  }

  res.render('signup');
});

module.exports = router;
