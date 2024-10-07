const express = require("express");
const router = express.Router();

const { login,register,update,forget,sendOTP} = require("../Controller/userController");

// ==========================================Register Route===============================
router.post("/register",register);

// ======================Update route=========================================
router.put("/update/:id",update);
// ==============================Login Route===============================
router.post("/login", login);

// ===================================Forget password==========
router.put("/forget", forget);

router.post("/send-otp",sendOTP);

module.exports = router;
