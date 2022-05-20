const async = require("async");
const res = require("express/lib/response");
const userModel = require("../models/user");
const userAddModel = require("../models/userAddress");

function getUsers(req, res) {
  async.waterfall(
    [
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



      //find
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

// function addUsers(req, res) {
//   console.log("req.body", req.body);
//   console.log("req.query", req.query);
//   console.log("req.params", req.params);
//   res.send("post request");
// }

// function updateUsers(req, res) {
//   console.log("req.body", req.body);
//   console.log("req.query", req.query);
//   console.log("req.params", req.params);

//   res.send("put request");
// }
// function modifyUsers(req, res) {
//   console.log("req.body", req.body);
//   console.log("req.query", req.query);
//   console.log("req.params", req.params);

//   res.send("patch request");
// }
// function removeUsers(req, res) {
//   console.log("req.body", req.body);
//   console.log("req.query", req.query);
//   console.log("req.params", req.params);

//   res.send("delete request");
// }

module.exports = {
  getUsers,
  // ,
  // addUsers,
  // updateUsers,
  // modifyUsers,
  // removeUsers,
};
