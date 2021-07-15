const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// find users
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
  
    try {
      const createPost = await Post.create({...body, userId: req.session.userId});
      // title: req.body.title,      
      res.json(createPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.put('/:id', withAuth, async (req, res) => {
    try {
      const [updatedRows] = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (updatedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const [deletedRows] = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (deletedRows > 0) {
        res.status(200).end();
      } else {
        res.json(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;
  