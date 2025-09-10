const express = require("express");
const { registerUser, loginuser, updateUser, getAllUsers, deleteUser} = require("../controller/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/register/login", loginuser);
router.get("/",getAllUsers)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router;