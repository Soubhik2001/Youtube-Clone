const {body, validationResult} = require("express-validator");

const isValid = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    let errorMessages = [];
    results.array().forEach((error) => {
      errorMessages.push(error.msg);
    });

    return res.status(400).json({ success: false, messages: errorMessages });
  }
  next();
};


const validateEmail=[
    body("email")
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage("Invalid format in email address."),
];

const validatePassword = [
    body("password")
      .isLength({
        min: 6,
      })
      .escape()
      .withMessage("Password must have atleast 6 characters."),
  ];

const validateUsername =[
  body("username")
    .isLength({
      min:3,
    })
    .escape()
    .withMessage("Username must have atleast 3 characters."),
];

module.exports ={
    validateEmail,
    validatePassword,
    validateUsername,
    isValid
};