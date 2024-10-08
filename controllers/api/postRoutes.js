const router = require('express').Router();
const { Post } = require('../../models');
const {withGuard, withoutGuard, apiGuard }= require('../../utils/auth');


// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ all: true }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/posts
router.post('/', apiGuard, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/posts/:id
router.put('/:id', apiGuard, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/posts/:id
router.delete('/:id', apiGuard, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
