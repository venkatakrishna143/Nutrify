const db = require('../db/db.js');
const mongoose = require('mongoose');
const userModel = mongoose.model("users");

var getUser = (req,res)=>{
    const {id} = req.params;
    
    userModel.findOne({_id:id},(err)=>{
        if(err){
            console.log(err);
        }
    }).then(user=>{
        if(user){
            if (user.isAdmin){
                req.session.userId = id;
                req.session.admin=true;
                req.session.meals = user.meals;
                req.session.calorie = user.calorie;
                var today = new Date();
                req.session.mealDate = today.toISOString().substr(0, 10);

                userModel.find({},(err)=>{
                    if(err){
                        console.log(err)
                    }
                }).then((user)=>{
                    req.session.allUsers=user;
                    res.redirect('/adminDashboard');
                })                
            }
            else{
                req.session.userId = id;
                req.session.meals = user.meals;
                req.session.calorie = user.calorie;
                req.session.admin=false;
                var today = new Date();
                req.session.mealDate = today.toISOString().substr(0, 10);
                res.redirect('/dashboard');
            }
        }
        else{
            req.session.message="Register First";
            res.redirect('/signup');
        }
    })
};

module.exports.getUser = getUser;