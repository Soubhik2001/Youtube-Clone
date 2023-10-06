// const {validationResult} = require("express-validator");


const validateEmail=[
    body("email")
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage("Invalid format in email address ."),
];

const validatePassword = [
    body("password")
      .isLength({
        min: 6,
      })
      .escape()
      .withMessage("Password must have atleast 8 characters ."),
  ];

module.exports ={
    validateEmail,
    validatePassword
};