const express = require('express');
require('dotenv').config();
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
var exphbs  = require('express-handlebars');
const hbs = exphbs.create({ helpers });




const sess = {
    secret: 'Iron Maiden',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 24 * 60 * 60 * 1000
    })
};


const app = express();
const PORT = process.env.PORT || 3001;


app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/homeRoutes'));
app.use(routes);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.use(routes);

sequelize.sync ({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port 3001!'));
})