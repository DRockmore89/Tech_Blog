//activity 23-Ins_Auth-Review
const path = require('path');
const express = require('express');
const session = require('express-session');
const expressHBs = require('express-handlebars');
const helpers = require('./utils/helpers');
const Sequelize = require('sequelize');

// const routes = require('./controllers/');
const app = express();
const PORT = process.env.PORT || 3006;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

sequelize.define("Session", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.STRING,
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
});

function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId,
  };
}
const sess = {
  secret: 'MojoRising',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));
const hbs = expressHBs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/api/index'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
  sequelize.sync({ force: false });
});