const router = require('express').Router();
const { User } = require('../../models');

//activity 23 controllers/api/userRoutes.js 
//acitivy 24
//create a new user.
router.post('/', async (req, res) => {
try {
    const newUser = await User.create({
    //assign the entered username and password to 
    //the username and password.
    username: req.body.username,
    password: req.body.password,
    });

    // create session variables based on the logged in user
    req.session.save(() => {
    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;

    res.json(newUser);
    });
} catch (err) {
    res.status(500).json(err);
}
});


router.post('/login', async (req, res) => {
    try {
    // find the user who matches the posted username address
    const user = await User.findOne({
        where: {
        username: req.body.username,
        },
    });

    if (!user) {
        res.status(400).json({ message: 'No user found!' });
        return;
    }

    // verify the posted password with the password store in the database.
    const validPassword = user.checkPassword(req.body.password);
    // if password is not valid
    if (!validPassword) {
        res.status(400).json({ message: 'Incorrect user or password, please try again!' });
        return;
    }

    // create session variables based on the logged in user
    req.session.save(() => {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json({ user, message: 'You are now logged in!' });
    });
    } catch (err) {
    res.status(400).json({ message: 'No user found!' });
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      //remove the session variables
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  