const express = require('express')
const router = express.Router()
const {register,login} = require('../controllers/UserControllers')
const {UserValidator} = require('../validators/validator')

router.post('/register', register)


router.post('/login', requiresLogout, login)

function requiresLogout(req, res, next){
    if (req.session && req.session.user) {
        return res.json({err: 'You must be Logout in to Login continue'});        
    } else {
        return next();
    }
}
module.exports = router;
