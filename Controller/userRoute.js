const express = require("express");
const router = express.Router();

router.get("/data",(req,res)=>{
    res.send("This is user data in the controller");
})

module.exports = router;