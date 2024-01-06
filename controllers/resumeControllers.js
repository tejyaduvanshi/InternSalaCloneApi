const Student = require("../models/studentModel")
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const path = require("path")
const student = require("../models/studentModel")
const { v4: uuidv4 } = require('uuid');

exports.resume =catchAsyncErrors(async (req,res,next)=>{
    const {resume} = await Student.findById(req.id).exec();
    res.json({message:"secure resume homepage"})
})
//----------------------------Education----------------------------------------------------------------------


exports.addeducation =catchAsyncErrors(async (req,res,next)=>{

    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id : uuidv4()});
    await student.save();
    res.json({message:"Education Added "})
})

exports.editeducation =catchAsyncErrors(async (req,res,next)=>{

    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );

    student.resume.education[eduIndex]={...student.resume.education[eduIndex] , ...req.body};
    await student.save();
    res.json({message:"Education updated "})
})

exports.deleteeducation =catchAsyncErrors(async (req,res,next)=>{

    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id === req.params.eduid
    );

    student.resume.education = filterededu;
    await student.save();
    res.json({message:"Education Deleted "})
})


//-----------------------------Jobs-----------------------------------------------------------------------------


exports.addjob =catchAsyncErrors(async (req,res,next)=>{

    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id : uuidv4()});
    await student.save();
    res.json({message:"Job Added "})
})

exports.editjob =catchAsyncErrors(async (req,res,next)=>{

    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.jobid
    );

    student.resume.jobs[jobIndex]={...student.resume.jobs[jobIndex] , ...req.body};
    await student.save();
    res.json({message:"job updated "})
})

exports.deletejob =catchAsyncErrors(async (req,res,next)=>{

    const student = await Student.findById(req.id).exec();
    const filteredjob = student.resume.jobs.filter(
        (i) => i.id === req.params.jobid
    );

    student.resume.jobs = filteredjob;
    await student.save();
    res.json({message:"Job Deleted "})
})

//------------------------------Internship-------------------------------------------------------------------


exports.addinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internship.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Internship Added " });
});

exports.editinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internshipIndex = student.resume.internship.findIndex(
        (i) => i.id === req.params.internshipid
    );

    student.resume.internship[internshipIndex] = {
        ...student.resume.internship[internshipIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Internship updated " });
});

exports.deleteinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredInternship = student.resume.internship.filter(
        (i) => i.id === req.params.internshipid
    );

    student.resume.internship = filteredInternship;
    await student.save();
    res.json({ message: "Internship Deleted " });
});

//-------------------------responsibilities-------------------------------------------------------------------


exports.addresponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Responsibility Added " });
});

exports.editresponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const respIndex = student.resume.responsibilities.findIndex(
        (i) => i.id === req.params.resid
    );

    student.resume.responsibilities[respIndex] = {
        ...student.resume.responsibilities[respIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Responsibility updated " });
});

exports.deleteresponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredResp = student.resume.responsibilities.filter(
        (i) => i.id === req.params.resid
    );

    student.resume.responsibilities = filteredResp;
    await student.save();
    res.json({ message: "Responsibility Deleted " });
});


//---------------------------courses-------------------------------------------------------------------


exports.addcourses = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Courses Added " });
});

exports.editcourses = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const courseIndex = student.resume.courses.findIndex(
        (i) => i.id === req.params.courseid
    );

    student.resume.courses[courseIndex] = {
        ...student.resume.courses[courseIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Courses updated " });
});

exports.deletecourses = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredCourses = student.resume.courses.filter(
        (i) => i.id === req.params.courseid
    );

    student.resume.courses = filteredCourses;
    await student.save();
    res.json({ message: "Courses Deleted " });
});

//--------------------------projects----------------------------------------------------------


exports.addprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Projects Added " });
});

exports.editprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const projectIndex = student.resume.projects.findIndex(
        (i) => i.id === req.params.projectid
    );

    student.resume.projects[projectIndex] = {
        ...student.resume.projects[projectIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Projects updated " });
});

exports.deleteprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredProjects = student.resume.projects.filter(
        (i) => i.id === req.params.projectid
    );

    student.resume.projects = filteredProjects;
    await student.save();
    res.json({ message: "Projects Deleted " });
});


//-------------------------------skills-------------------------------------------------------------


exports.addskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Skills Added " });
});

exports.editskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const skillIndex = student.resume.skills.findIndex(
        (i) => i.id === req.params.skillid
    );

    student.resume.skills[skillIndex] = {
        ...student.resume.skills[skillIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Skills updated " });
});

exports.deleteskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredSkills = student.resume.skills.filter(
        (i) => i.id === req.params.skillid
    );

    student.resume.skills = filteredSkills;
    await student.save();
    res.json({ message: "Skills Deleted " });
});

//-------------------------accomplishments----------------------------------------------------------------


exports.addaccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Accomplishments Added " });
});

exports.editaccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const accomIndex = student.resume.accomplishments.findIndex(
        (i) => i.id === req.params.accomid
    );

    student.resume.accomplishments[accomIndex] = {
        ...student.resume.accomplishments[accomIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Accomplishments updated " });
});

exports.deleteaccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredAccomplishments = student.resume.accomplishments.filter(
        (i) => i.id === req.params.accomid
    );

    student.resume.accomplishments = filteredAccomplishments;
    await student.save();
    res.json({ message: "Accomplishments Deleted " });
});





