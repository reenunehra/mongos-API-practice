const async = require("async");
// const res = require("express/lib/response");
const userModel = require("../models/user");
const userAddModel = require("../models/userAddress");
const mongoose = require('mongoose');

function getUsers(req,res) {



    console.log("getusers");

    
    userModel.find({}), function (err, docs) {
        console.log("users")
        if (err){
            console.log(err);
            res.send("error");
        }
        else{
            console.log("First function call : ", docs);
            
            res.send(docs);
            
          
        }
    }
}

module.exports = {
  getUsers,
  // getUser,
  // getUsername,
  // addUser,
};
