//activity 20-Stu_Middleware utils/auth.js

const withAuth = (req, res, next) => {
    //if the user is not logged in, redirect the user to the login page.
    //this is directly from the `/gallery/:id` and `/painting/:id` routes
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      //if the user is logged in, execute the route function that will allow 
      //them to view the blog posts.
      //we call next() if the user is authenticated
      next();
    }
  };
  
  module.exports = withAuth;