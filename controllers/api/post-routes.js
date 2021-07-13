const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

//use withAuth middleware to prevent access to route.
//if you are logged in, then you can create new blog posts.
//this way the / route and all its child routes will be protected 
//by our authentication middleware..
router.post('/', withAuth, async (req, res) => {

//create a new blog post.
try {
    const newPost = await Post.create({ 
            userId: req.session.userId });

    res.json(newBlogPost);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
try {
    //this is array destructuring assignment in JS. 
    //suppose you have array [1, 2]. const [a] = [1, 2]; will 
    //assign variable a with value 1.
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
    //this is array destructuring assignment in JS. 
    //suppose you have array [1, 2]. const [a] = [1, 2]; will 
    //assign variable a with value 1.
    const [updatedRows] = Post.destroy({
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

module.exports = router;