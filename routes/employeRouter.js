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
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob,
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

//----------------------------------Internship----------------------------------------------------------------------


//Post /employe/internship/create
router.post("/internship/create",isAuthenticated,createinternship)

//Post /employe/internship/read
router.post("/internship/read",isAuthenticated,readinternship)

//Post /employe/internship/read/:id
router.post("/internship/read/:id",isAuthenticated,readsingleinternship)


//----------------------------------Jobs----------------------------------------------------------------------


//Post /employe/job/create
router.post("/job/create",isAuthenticated,createjob)

//Post /employe/internship/read
router.post("/job/read",isAuthenticated,readjob)

//Post /employe/internship/read/:id
router.post("/job/read/:id",isAuthenticated,readsinglejob)



module.exports=router
