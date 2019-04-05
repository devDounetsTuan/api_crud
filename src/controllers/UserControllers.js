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
            return res.json({err: 'Email are incorrect'})
        }
       // console.log(user);
        bcrypt.compare(req.body.password, user.password, (err, result) => {   
            if(result){
                //console.log(req);
                //req.session = {};
                req.session.user = user
                //console.log(req.mySession.user);
                res.json({
                    user: user,
                    "login": "success"
                })
            }else{
                return res.json({err: 'Password are incorrect'})
            }
        })
    })
}

exports.logout = function(req, res){
    console.log("tuan "+req.session)
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return res.json({err});
            } else {
                return res.json({'logout': "Success"});
            }
        });
    }
}