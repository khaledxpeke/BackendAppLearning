const express = require("express");
const { registerUser, loginUser, updateUserProfile, getAllUsers } = require("../controllers/userController");
const router = express.Router();
router.route("/").post(registerUser);
router.route("/Login").post(loginUser);
router.route("/update").post(updateUserProfile);
router.route("/users").get(getAllUsers);

module.exports = router;
