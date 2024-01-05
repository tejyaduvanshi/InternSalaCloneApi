const express = require("express")
const router = express.Router()
const {
    hompage,
    studentsignup, 
    studentsignin , 
    studentsignout ,
    currentstudent ,
    studentsendmail , 
    studentforgetlink, 
    studentresetpassword,
    studentupdate,
    studentavatar
} = require("../controllers/indexControllers")
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

//post /student/send-mail    //forgetpassword
router.post("/student/send-mail",studentsendmail)

//GET /student/forget-link/:studentid
router.get("/student/forget-link/:id",studentforgetlink)

//Post /student/reset-password/:id
router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword)

//Post /student/update/student:id
router.post("/student/update/:id",isAuthenticated,studentupdate)

//Post /student/upload/student:id
router.post("/student/avatar/:id",isAuthenticated,studentavatar)



module.exports=router
