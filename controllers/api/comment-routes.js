const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//activity 28 controllers/homeRoutes.js.
//activity 28 controllers/projectRouts.js
//use withAuth middleware to prevent access to route.
//if you are logged in, then you can create new blog posts.
//this way the / route and all its child routes will be protected 
//by our authentication middleware.
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;