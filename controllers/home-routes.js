const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// WHEN I click on the homepage option
// THEN I am taken to the homepage.
// GET all posts for homepage which includes existing blog 
// posts if any have been posted.
router.get('/', async (req, res) => {
try {
  const postData = await Post.findAll({ 
    //show data for user who created blogpost together with blogpost.
    //Get all blog posts and JOIN with user data
    include: [{ model: User,
        attributes: ['username'],
    },
  ],
  });

  // serialize data so the template can read it
  const posts =  postData.map((post) => 
    post.get({ plain: true })
  );

  res.render('allPosts', { 
    posts 
  });
} catch (err) {
  res.status(500).json(err);
}
});

// GET one post
router.get('/post/:id', async (req, res) => {
try {
  const  postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, model: Comment,
            attributes: ['username'], 
          }],
  });     
  if (postData) {
    const posts =  postData.get({ plain: true });
 
    //L14.2 @00:51:54
    //pass posts as an object to the render and not as an array.
    //the object passed to render needs to be plain text as well.
    res.render('onePost', { posts });
  } else {
    res.status(404).end();
  }
} catch (err) {
  res.status(500).json(err);
}
});

// activity 17, controllers/api/home-routes.js
// Login route
router.get('/login', (req, res) => {
// if the user is already logged in, redirect to the homepage
if (req.session.loggedIn) {
  res.redirect('/');
  return;
}
// otherwise, render the 'login' template
res.render('login');
});

// WHEN I click on any other links in the navigation
// THEN I am prompted to either sign up or sign in
router.get('/signup', (req, res) => {
// if the user is already logged in, redirect to the homepage
if (req.session.loggedIn) {
  res.redirect('/');
  return;
}
// otherwise, render the 'signup' template
res.render('signup');
});

module.exports = router;