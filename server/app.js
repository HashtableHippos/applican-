const express = require('express');
const path = require('path');
const Session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const apiRouter = require('./router/apiRouter');
const authRouter = require('./router/authRouter');
const s3Router = require('./router/s3Router');
const cookieParser = require('cookie-parser')();
const passport = require('passport');

const app = express();


app.use(express.static(path.join(__dirname, '../public/')));


// PASSPORT SETUP
require('./router/passport.js')(passport);

app.use(Session({ secret: 'hippos', resave: true, saveUninitialized: true }));
app.use(cookieParser);
app.use(bodyParser.json());
app.use(fileUpload({ fileSize: 5 * 1024 * 1024 }));
app.use(passport.initialize());
app.use(passport.session());

// ROUTING
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/coverletter', s3Router);

// Automatically redirects to index.html for React-Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// INIT
app.set('port', process.env.PORT || 2245);


app.listen(app.get('port'), (err) => {
  if (err) {
    return console.log('Error starting server', err);
  }
  return console.log('Applican-: Listening on port:', app.get('port'));
});

module.exports = app;
