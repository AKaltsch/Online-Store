const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email", "Please enter valid email.").isEmail(),
    body("password", "Please enter a valid password.")
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  // check comes from the validator
  // names in validation have to be the same names that are in the views
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      // Example of how to make a custom validator
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This is not a real email!!");
        // }
        // return true;
        // // // this is how we add our own async validation
        // // if we return a promise, then express-validator will wait for the promise to be fulfilled
        return User.findOne({ email: email }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail already exists, please pick a different one."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only numbers and letters that is at least 6 characters long."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match.");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get(`/reset/:token`, authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
