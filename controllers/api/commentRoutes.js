const router = require('express').Router();
const { Comment } = require('../../models');
const {apiGuard, withGuard, withoutGuard }= require('../../utils/auth');

// GET /api/comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ all: true }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/comments
router.post('/', apiGuard, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE /api/comments/:id
router.delete('/:id', apiGuard, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
