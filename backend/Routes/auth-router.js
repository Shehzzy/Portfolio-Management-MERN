const express = require('express');
var authenticateJWT = require('../Middlewares/authenticateMiddleware');
var authorizeRole = require('../Middlewares/authorizationMiddleware');
const router = express.Router();
const authController = require('../Controllers/auth-controller') 

router.post(authController.register);
router.post(authController.login);

// Admin-only route
router.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => {
    res.send('Welcome, Admin!');
  });
  
  // User route (available to any logged-in user)
  router.get('/user', authenticateJWT, (req, res) => {
    res.send('Welcome, User!');
  });


  

  module.exports = router;