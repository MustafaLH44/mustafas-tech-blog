const router = require('express').Router();
const { Post } = require('../models');
const {apiGuard} = require('../utils/auth');

// GET /dashboard
router.get('/', apiGuard, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard.handlebars', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /dashboard/new
router.get('/new', apiGuard, (req, res) => {
  res.render('post.handlebars', {
    logged_in: req.session.logged_in,
  });
});

// GET /dashboard/edit/:id
router.get('/edit/:id', apiGuard, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    res.render('post.handlebars', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
