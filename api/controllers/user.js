// ============ Importing Dependencies ======================
const mongoose = require("mongoose");
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../config/config");

exports.getAllUsers = (req, res, next) => {
  Users.find()
    .select("_id email")
    .exec()
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({
          totalUsers: result.length,
          Users: result.map(usr => {
            return {
              _id: usr._id,
              email: usr.email,
              moreInfo: {
                requestType: "GET",
                url: "http://localhost:3000/users/" + usr._id
              }
            };
          })
        });
      } else {
        res.status(404).json({
          error: "No More Users Exist !!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.postNewUser = (req, res, next) => {
  Users.find({ email: req.body.email })
    .exec()
    .then(result => {
      if (result.length > 0) {
        res.status(409).json({
          error: "Email address already Exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const user = new Users({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hashedPassword
            })
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User Created",
                  userDetails: "http://localhost:3000/users/" + result._id,
                  fetchAllUsers: "http://localhost:3000/users"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.postLogin = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .exec()
    .then(result => {
      if (result) {
        bcrypt.compare(req.body.password, result.password, (err, user) => {
          if (user) {
            const token = jwt.sign(
              {
                email: result.email,
                userID: result._id
              },
              JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(201).json({
              message: "Auth Succeed",
              token: token
            });
          } else {
            return res.status(401).json({
              message: "Auth Failed"
            });
          }
        });
      } else {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.getParticularUser = (req, res, next) => {
  const id = req.params.userID;
  Users.findById(id)
    .select("_id email")
    .exec()
    .then(result => {
      res.status(200).json({
        userDetails: result,
        fetchAllUsers: {
          requestType: "GET",
          url: "http://localhost:3000/users"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.userID;
  Users.deleteOne({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "User removed",
        fetchAllUsers: {
          requestType: "GET",
          url: "http://localhost:3000/users"
        },
        createNewUser: {
          requestType: "POST",
          url: "http://localhost:3000/users/signup",
          body: {
            email: "Your Email Address",
            password: "Your Password"
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.patchUser = (req, res, next) => {
  const id = req.params.userID;
  bcrypt.hash(req.body.newPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(409).json({
        error: err
      });
    } else {
      Users.updateOne(
        { _id: id },
        {
          $set: {
            email: req.body.newEmail,
            password: hashedPassword
          }
        }
      )
        .exec()
        .then(result => {
          res.status(200).json({
            message: "User's Credentials Updated",
            takeAview: "http://localhost:3000/users/" + id,
            fetchAllUsers: {
              type: "GET",
              url: "http://localhost:3000/users"
            }
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
};