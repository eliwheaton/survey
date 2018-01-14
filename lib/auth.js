const auth = {

  check: function(req, res, next) {
    if (req.isAuthenticated()) {
      // If they're logged in, disable caching for every route because we don't want the back button to show secure data
      res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

      return next();
    }

    return res.redirect('/users/signin');
  },

  allow: function(roles) {
    return function(req, res, next) {
      if (req.isAuthenticated()) {

        roles.forEach((role) => {
          if (req.user.roles.includes(role)) {
            return next();
          }
        })

        return res.redirect('/users/permission-denied');
      }
      else {
        return res.redirect('/users/signin');
      }
    }
  }
  
}

module.exports = auth;