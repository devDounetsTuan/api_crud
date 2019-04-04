const User = require('../models/UserModels')
const bcrypt = require('bcrypt')
exports.register = function (req, res, next) {
    //console.log(req.body.email);
    User.findOne({
        email: req.body.email       
    }, (err, user) => {
        if (user == null) {
           
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return next();
                }
                console.log(req.body);
                const user = new User(req.body)
                user.role = ['customer']
                user.password = hash;
                user.password_confirm = hash;
                user.save((err, result) => {
                    if (err) {
                        return res.json(err)
                    }
                    res.json({
                        user: result
                    })
                })
            })
        // console.log(user);
        } else {
            res.json({
                err: 'Email has been used'
            })
        }
    })
    
}

exports.login = function(req, res){
    User.findOne({email: req.body.email}).exec(function(err, user){
        if(err) {
            return res.json({err})
        }else if (!user){
            return res.json({err: 'Username and Password are incorrect'})
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(result === true){
                req.session.user = user
                res.json({
                    user: user,
                    "login": "success"
                })
            }else{
                return res.json({err: 'Username and Password are incorrect'})
            }
        })
    })
}