const express = require('express');
const router = express.Router();

const {register,login,getUsers} = require('../controllers/auth');


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getusers").get(getUsers);

module.exports = router;