const express = require('express')
const router = express.Router()
const {register,login,logout} = require('../controllers/UserControllers')
const {UserValidator} = require('../validators/validator')

router.post('/register', register)


router.post('/login', requiresLogout, login)

function requiresLogout(req, res, next){
  //  console.log(req.session.user)
    if (req.session && req.session.user) {
        return res.json({err: 'You must be Logout in to Login continue'});        
    } else {
        return next();
    }
}

function requiresLogin(req, res, next) {
 console.log(req.session.user);
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.json({err: 'You must be logged in to view this page.'});
    }
}

router.get('/logout', requiresLogin, logout)
module.exports = router;
