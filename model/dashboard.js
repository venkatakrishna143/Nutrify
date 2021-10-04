const db = require('../db/db.js');
const mongoose = require('mongoose');
const userModel = mongoose.model("users");

var getToday = (req,res)=>{
    const id = req.session.userId;
    const {mealDate} = req.body;
    userModel.findOne({_id:id},(err)=>{
        if(err){
            console.log(err);
        }
    }).then((user)=>{
        let meals = user.meals;
        req.session.meals = meals;
        req.session.mealDate = mealDate;
        if (req.session.admin==true){
            res.redirect('/adminDashboard');
        }
        else{
            res.redirect('/dashboard');
            console.log(req.session.admin);
        }
    });
};

module.exports.getToday = getToday;