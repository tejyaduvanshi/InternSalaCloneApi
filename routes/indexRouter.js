const express = require("express")
const router = express.Router()
const { hompage, studentsignup, studentsignin , studentsignout ,currentstudent ,studentsendmail} = require("../controllers/indexControllers")
const { isAuthenticated } = require("../middlewares/auth")

// GET /
router.get("/",isAuthenticated,hompage)

// GET /student
router.post("/student",isAuthenticated,currentstudent)

//POST /student/signup
router.post("/student/signup" , studentsignup)

//POST /student/signin
router.post("/student/signin",studentsignin)

//GET /student/signout
router.get("/student/signout",isAuthenticated,studentsignout)

//GET /student/send-mail    //forgetpassword
router.get("/student/send-mail",studentsendmail)


module.exports=router
