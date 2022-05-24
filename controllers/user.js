const async = require("async");
const { status } = require("express/lib/response");
const res = require("express/lib/response");
const userModel = require("../models/user");
const userAddModel = require("../models/userAddress");

// -------------------------------------------get all user names in order by name---------------
function getUsersName(req, res) {
  async.waterfall(
    [
      function (cb) {
        userModel.find({}).sort({name: 1}).exec(function(err, UsersData) {
        
          if (err) {
            console.log(err);
            cb(true);
          }
          cb(null,UsersData); 
        });
      }
    ],
   (err, UsersData) => {
      if (err) {     
        res.status(400).json({ success: false, err: err });
      } else {
        let data = {          
          Users: UsersData
        };
        res.status(200).json({ success: true, data: data });
      }
    }
  );
}
      

//--------------------------------------find-----get---------------------------------------------
function getUsers(req, res) {
  async.waterfall(
    [
      function (cb) {
        userModel.find({}, (err, UsersData) => {
          if (err) {
            console.log(err);
            cb(true, UsersData);
          }
          cb(null, UsersData); 
        });
      },

      //address
      function (UsersData, cb) {
        userAddModel.find({}, (err, userAddressData) => {
          if (err) {
            cb(true, userAddressData);
          }

          cb(null, UsersData, userAddressData);
        });
      },
    ],

    (err, UsersData, userAddressData) => {
      if (err) {     
        res.status(400).json({ success: false, err: err });
      } else { 
        let data = {
          address: userAddressData,
          Users: UsersData,
        };
        res.status(200).json({ success: true, data: data });
      }
    }
  );
}

// ----------------------------------------findOneAndUpdate------$set----------put-----------------------
function getUsersID(req, res) {  
  console.log("req.params", req.params);

    async.waterfall([
      function (cb) {
        
        userModel.findOneAndUpdate({_id: req.params.id},{$set:{name: "Rishi"}},(err, findData)=>{       
  
          if(err){
            console.log(err);
            cb(true); 
          }else{
            console.log("finddata",findData)
            cb(null, findData)
          }
        })
      },
  
      function (findData, cb) {    

        userAddModel.findOneAndUpdate({userID: req.params.id},{$set:{address: "RishiHome"}},(err, findDatas)=>{       
  
          if(err){
            console.log(err);
            cb(true);
          }else{
            console.log("finddata",findDatas)
            cb(null,findData,findDatas)
          }
        })
      }
    ],
    (err, findData, findDatas) => {
      if (err) {
        res.status(400).json({ success: false, err: err });
      } else {
        let data = {
          Users: findData,
          address: findDatas
        };
        res.status(200).json({ success: true, data: data });
      }
    }  
    );
  } 
//------------------------------------post---------------------------------------------------------------

function addUsers(req, res) {
  async.waterfall([
    function (cb) {
      // console.log(typeof req.body);
      const obj = {
        name: req.body.name,
        status: req.body.status,
      };

      const user = new userModel(obj);

      user.save().then(() => {
          cb(null, user);
        }).catch((e) => {
          cb(true);
        }); 

    },

    function (user, cb) {

      const obj2 = {   
        Pincode: req.body.Pincode,
        address: req.body.address,
        userID: user._id
      };

      const useraddresses = new userAddModel(obj2);

      useraddresses.save().then(() => {
          cb(null,user, useraddresses);
        })
        .catch((e) => {
          console.log(e);
          cb(true);
        });
    },
  ],
  (err, user, useraddresses) => {
    if (err) {
      res.status(400).json({ success: false, err: err });
    } else {
      let data = {
        Users: user,
        address: useraddresses
      };
      res.status(200).json({ success: true, data: data });
    }
  }  
  );
}
// ---------------------------------------putAPI-----api/v1/updateuser/:<id> - add user with address----------------------------------------------------

// function updateUsers(req, res) {  
//   console.log("req.params", req.params);
//     async.waterfall([
//       function (cb) {
//         let name_id = "6288848d5484a93fa3538d32"
//         userModel.findByIdAndUpdate(name_id, {name:"RJatin"},(err, findData)=>{       
  
//           if(err){
//             cb(true);
//           }else{
//             console.log("finddata",findData)
//             cb(null, findData)  
//           }
//         })
//       },
  
//       function (findData, cb) {       
  
//         let name_id = "62877545720666a32c784170"
//         console.log(name_id);
//         userAddModel.findByIdAndUpdate(name_id, {address:"blog5000"},(err, findDatas)=>{       
  
//           if(err){

//             cb(true);
//           }else{
//             console.log("finddata",findDatas)
//             cb(null,findData,findDatas)
//           }
//         })
//       }
//     ],
//     (err, findData, findDatas) => {
//       if (err) {
//         res.status(400).json({ success: false, err: err });
//       } else {
//         let data = {
//           Users: findData,
//           address: findDatas
//         };
//         res.status(200).json({ success: true, data: data });
//       }
//     }  
//     );
//   }


//--------------------------------------findOneAndUpdate-------$unset----------put--------------
function updateUsers(req, res) {  
  // console.log("req.params", req.params);

    async.waterfall([
      function (cb) {
        
        userModel.findOneAndUpdate({_id: req.params.id},{$unset:{name: 1}},(err, findData)=>{       
  
          if(err){
            console.log(err);
            cb(true); 
          }else{
            console.log("finddata",findData)
            cb(null, findData)
          }
        })
      },
  
      function (findData, cb) {       
  
        
        userAddModel.findOneAndUpdate({userID: req.params.id},{$unset:{address: "blog5000"}},(err, findDatas)=>{       
  
          if(err){
            console.log(err);
            cb(true);
          }else{
            console.log("finddata",findDatas)
            cb(null,findData,findDatas)
          }
        })
      }
    ],
    (err, findData, findDatas) => {
      if (err) {
        res.status(400).json({ success: false, err: err });
      } else {
        let data = {
          Users: findData,
          address: findDatas
        };
        res.status(200).json({ success: true, data: data });
      }
    }  
    );
  } 




// -------------------------------------------modifyUsers--------- patch------------------------------------------
function modifyUsers(req, res) {
  
    // console.log("req.params", req.params);
  
      async.waterfall([
        function (cb) {
          
          userModel.findOneAndUpdate({_id: req.params.id},{$set:{status: true}},(err, findData)=>{       
    
            if(err){
              console.log(err);
              cb(true);     
            }else{
              console.log("finddata",findData)
              cb(null, findData)
            }
          })
        },
    
        function (findData, cb) {       
    
          
          userAddModel.findOneAndUpdate({userID: req.params.id},{$set:{address: "Home"}},(err, findDatas)=>{       
    
            if(err){
              console.log(err);
              cb(true);
            }else{
              console.log("finddata",findDatas)
              cb(null,findData,findDatas)
            }
          })
        }
      ],
      (err, findData, findDatas) => {
        if (err) {
          res.status(400).json({ success: false, err: err });
        } else {
          let data = {
            Users: findData,
            address: findDatas
          };
          res.status(200).json({ success: true, data: data });
        }
      }  
      );
    }    

// ----------------------------------------------DeleteData----------------------------------------------------

function removeUsers(req, res) {

  
    console.log("req.params", req.params);
  
    async.waterfall([
      function (cb) {
        
        userModel.findOneAndDelete({_id: req.params.id},{$set:{status: true}},(err, removeData)=>{       
  
          if(err){
            console.log(err);
            cb(true);     
          }else{
            console.log("removedata",removeData)
            cb(null, removeData)
          }
        })
      },
  
      function (removeData, cb) {       
  
        
        userAddModel.findOneAndDelete({userID: req.params.id},{$set:{address: "Home"}},(err, removeDatas)=>{       
  
          if(err){
            console.log(err);
            cb(true);
          }else{
            console.log("finddata",removeDatas)
            cb(null,removeData,removeDatas)
          }
        })
      }
    ],
    (err, removeData, removeDatas) => {
      if (err) {
        res.status(400).json({ success: false, err: err });
      } else {
        let data = {
          Users: removeData,
          address: removeDatas
        };
        res.status(200).json({ success: true, data: data });
      }
    }  
    );
  }    

module.exports = {
  getUsersName,
  getUsers,
  getUsersID,

  addUsers,
  updateUsers,
  modifyUsers,
  removeUsers,
};



// ------------------------------updateMany------------------------------------
      // function (cb) {
      //   userModel.updateMany({age:{$gte:25}},
      //     {name:"Jatin"}, (err, UsersUpdateData) => {
      //       if (err) {
      //         console.log(err);
      //         cb(true, UsersUpdateData);
      //       }
      //       else{
      //         // console.log("users",UsersUpdateData);

      //         cb(null);
      //       }
      //     });
      // },
      // ------------------------------updateOne------------------------------------
      // function (cb) {
      //   userModel.updateOne({ name: "reenu" }, (err, UpdateData) => {
      //     if (err) {
      //       cb(true);
      //     } else {
      //       cb(null);
      //       console.log("updateData", UpdateData);
      //     }
      //   });
      // },

      // ------------------------------find by id and update name------------------------------------
      // function (cb) {
      //   let name_id = "6287749a720666a32c78416e"
      //   userModel.findByIdAndUpdate(name_id, { name: "Nisha" }, (err, findData) => {
      //     if (err) {
      //       cb(true);
      //     } else {
      //       console.log("finddata",findData);
      //       cb(null);

      //     }
      //   });
      // },
      // ------------------------------find one and update------------------------------------
      // function (cb) {

      //   userModel.findOneAndUpdate({age: {$gte:25}},{ name: "Siddharth" }, (err, findData) => {
      //     if (err) {
      //       cb(true);
      //     } else {
      //       console.log("finddata",findData);
      //       cb(null);

      //     }
      //   });
      // },

      // ------------------------------delete one------------------------------------
      // function (cb) {
      //   userModel.deleteOne({ age: { $gte: 28 } })
      //     .then(function () {
      //       cb(null);
      //     })
      //     .catch(function (error) {
      //       cb(true);
      //     });
      // },

      //  // ------------------------------find one------------------------------------
      // function (cb) {
      //   userModel.findOne({ age: { $gte: 22 } }, function(err, findoneData){
      //     if(err){
      //       console.log(err)
      //       cb(true);
      //     }
      //     else{
      //       console.log("result", findoneData);
      //       cb(null);
      //     }
      //   });

      // },
      // ------------------------------find ()------------------------------------
      // function (cb) {
      //   userModel.find({age: {$gte:23}},{ name: "Sahil" }, {limit:1}, (err, findoneData) =>{
      //     if(err){

      //       cb(true);
      //     }
      //     else{
      //       console.log("findoneData",findoneData);
      //       cb(null);
      //     }
      //   });

      // },
      // ------------------------------find by id---------------------------------
      // function (cb) {
      //   let name_id = '6287c85c8967b59287656bda'
      //   userModel.findById(name_id, function(err, findByidData) {
      //     if(err){
      //       console.log(err);
      //       cb(true);
      //     }
      //     else{
      //       console.log("findByidData",findByidData);
      //       cb(null);
      //     }
      //   });

      // },

      // ------------------------------find by id and delete---------------------------------
      // function (cb) {
      //   let name_id = '6287d4d98967b59287656bdb'
      //   userModel.findByIdAndDelete(name_id, function(err, findByidandDeleteData) {
      //     if(err){
      //       console.log(err);
      //       cb(true);
      //     }
      //     else{
      //       console.log("findByidandDeleteData",findByidandDeleteData);
      //       cb(null);
      //     }
      //   });

      // },

      // ------------------------------find by id and remove---------------------------------
      // function (cb) {
      //   let name_id = '6287d4d98967b59287656bdd'
      //   userModel.findByIdAndRemove(name_id, function(err, findByidandRemoveData) {
      //     if(err){
      //       console.log(err);
      //       cb(true);
      //     }
      //     else{
      //       console.log("Remove User",findByidandRemoveData);
      //       cb(null);
      //     }
      //   });

      // },

      // ------------------------------findOneandremove---------------------------------
      // function (cb) {
      //   userModel.findOneAndRemove({age: {$gte:22} }, function(err, findOneAndRemove) {
      //     if(err){
      //       console.log(err);
      //       cb(true);
      //     }
      //     else{
      //       console.log("Remove User",findOneAndRemove);
      //       cb(null);
      //     }
      //   });

      // },

      // ------------------------------findOneAndDelete---------------------------------
      // function (cb) {
      //   userModel.findOneAndDelete({ age: { $gte: 23 } }, function (err, findOneAnddelete) {
      //       if (err) {
      //         console.log(err);
      //         cb(true);
      //       } else {
      //         console.log("Delete User", findOneAnddelete);
      //         cb(null);
      //       }
      //     }
      //   );
      // },

      // ------------------------------findOneAndDelete---------------------------------
      // function (cb) {
      //   userModel.remove({ age: { $gte: 11 } }, function (err, findOneAnddelete) {
      //       if (err) {
      //         console.log(err);
      //         cb(true);
      //       } else {
      //         console.log("Remove User", findOneAnddelete);
      //         cb(null);
      //       }
      //     }
      //   );
      // },
