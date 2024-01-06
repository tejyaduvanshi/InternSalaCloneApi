const express = require("express")
const router = express.Router()
const {
    resume,
    addeducation,
    editeducation,
    deleteeducation,
    // addjob,
    // editjob,
    // deletejob,
    // addinternship,
    // editinternship,
    // deleteinternship,
    // addresponsibilities,
    // editresponsibilities,
    // deleteresponsibilities,
    // addcourses,
    // editcourses,
    // deletecourses,
    // addprojects,
    // editprojects,
    // deleteprojects,
    // addskills,
    // editskills,
    // deleteskills,
    // addaccomplishments,
    // editaccomplishments,
    // deleteaccomplishments,


} = require("../controllers/resumeControllers")
const { isAuthenticated } = require("../middlewares/auth")

// GET /
router.get("/",isAuthenticated,resume)
//----------------------------Education----------------------------------------------------------------------
//
//POST
router.post("/add-edu", isAuthenticated, addeducation)

//post
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)

//post
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)

// //-----------------------------Jobs-----------------------------------------------------------------------------

// //
// //POST
// router.post("/add-job", isAuthenticated, addjob)

// //post
// router.post("/edit-job/:jobid", isAuthenticated, editjob)

// //post
// router.post("/delete-job/:jobid", isAuthenticated, deletejob)

// //------------------------------Internship-------------------------------------------------------------------

// //
// //POST
// router.post("/add-internship", isAuthenticated, addinternship)

// //post
// router.post("/edit-internship/:internshipid", isAuthenticated, editinternship)

// //post
// router.post("/delete-internship/:internshipid", isAuthenticated, deleteinternship)
// //-------------------------responsibilities-------------------------------------------------------------------

// //
// //POST
// router.post("/add-responsibilities", isAuthenticated, addresponsibilities)

// //post
// router.post("/edit-responsibilities/:resid", isAuthenticated, editresponsibilities)

// //post
// router.post("/delete-responsibilities/:resid", isAuthenticated, deleteresponsibilities)
// //---------------------------courses-------------------------------------------------------------------

// //
// //POST
// router.post("/add-courses", isAuthenticated, addcourses)

// //post
// router.post("/edit-courses/:courseid", isAuthenticated, editcourses)

// //post
// router.post("/delete-courses/:courseid", isAuthenticated, deletecourses)
// //--------------------------projects----------------------------------------------------------

// //
// //POST
// router.post("/add-projects", isAuthenticated, addprojects)

// //post
// router.post("/edit-projects/:projectid", isAuthenticated, editprojects)

// //post
// router.post("/delete-projects/:projectid", isAuthenticated, deleteprojects)

// //-------------------------------skills-------------------------------------------------------------

// //
// //POST
// router.post("/add-skills", isAuthenticated, addskills)

// //post
// router.post("/edit-skills/:skillid", isAuthenticated, editskills)

// //post
// router.post("/delete-skills/:skillid", isAuthenticated, deleteskills)
// //-------------------------accomplishments----------------------------------------------------------------

// //
// //POST
// router.post("/add-accomplishments", isAuthenticated, addaccomplishments)

// //post
// router.post("/edit-accomplishments/:accomid", isAuthenticated, editaccomplishments)

// //post
// router.post("/delete-accomplishments/:accomid", isAuthenticated, deleteaccomplishments)


// module.exports=router
