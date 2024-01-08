const express = require("express")
const router = express.Router()
const {
    hompage,
    employesignup, 
    employesignin , 
    employesignout ,
    currentemploye ,
    employesendmail , 
    employeforgetlink, 
    employeresetpassword,
    employeupdate,
    employeavatar
} = require("../controllers/employeControllers")
const { isAuthenticated } = require("../middlewares/auth")

// GET /
router.get("/",isAuthenticated,hompage)

// GET /employe
router.post("/currentemploye",isAuthenticated,currentemploye)

//POST /employe/signup
router.post("/signup" , employesignup)

//POST /employe/signin
router.post("/signin",employesignin)

//GET /employe/signout
router.get("/signout",isAuthenticated,employesignout)

//post /employe/send-mail    //forgetpassword
router.post("/send-mail",employesendmail)

//GET /employe/forget-link/:employeid
router.get("/forget-link/:id",employeforgetlink)

//Post /employe/reset-password/:id
router.post("/reset-password/:id",isAuthenticated,employeresetpassword)

//Post /employe/update/employe:id
router.post("/update/:id",isAuthenticated,employeupdate)

//Post /employe/upload/employe:id
router.post("/avatar/:id",isAuthenticated,employeavatar)



module.exports=router
