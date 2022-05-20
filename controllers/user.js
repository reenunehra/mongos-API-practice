const async = require("async");
const res = require("express/lib/response");
const userModel = require("../models/user");
const userAddModel = require("../models/userAddress");

function getUsers(){
    console.log("hello")
    async.waterfall([
        function(cb){
            let a = userModel.find({},(res)=>{
                cb(null,res);
            });
        },
        function(arg,cb){
            let a = userAddModel.find({},(res)=>{
                cb(null,res,arg);
            });
        }
    ],(err, add, user)=>{
        if(err){
            res.status(400).json({success:false,err:err})
        }
        else{
            let data = {
                address: add,
                Users: user
            }
            res.status(200).json({success:true,data:data});
        }
    })
}


module.exports = {
    getUsers,
    // getUser,
    // getUsername,
    // addUser,
  };
