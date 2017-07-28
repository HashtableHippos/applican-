const authRouter = require('express').Router();
const passport = require('passport');

// Google oauth route
authRouter.get('/google',
  passport.authenticate('google', { prompt: 'consent', scope: ['profile', 'email'] }));

// Google oauth callback
authRouter.get('/google/callback',
  passport.authenticate('google', {
    prompt: 'consent',
    failureRedirect: '/auth/google',
    successRedirect: '/',
  })
);

authRouter.get('/checkAuth', (req, res) => {
  res.status(200).json({
    status: req.isAuthenticated() });
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.sendStatus(500);
    }
    req.logout();
    res.redirect('/');
  });
});


module.exports = authRouter;
