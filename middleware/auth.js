module.exports = {
  ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
          return next()
      } else {
          res.redirect('/')
      }
  },

  // If you are logged in and you want to go to the landing page, you don't have to see the login page
  ensureGuest: function (req, res, next) {
      if (req.isAuthenticated()) {
          res.redirect('/dashboard')
      } else {
          return next()
      }
  },
}