const Student = require("../models/studentModel")
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const comparepassword =require("../models/studentModel")
const { sendtoken } = require("../utils/sendToken")
const { sendmail } = require("../utils/nodemailer")
const imagekit = require("../utils/imagekit").initImagekit();
const path = require("path")
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel")

//homepage /route

//without try catch we only use catchAsymvError

exports.hompage =catchAsyncErrors(async (req,res,next)=>{
    res.json({message:"secure homepage"})
})

exports.currentstudent =catchAsyncErrors(async (req,res,next)=>{

    const student = await Student.findById(req.id).exec()
    res.json({student});
})


exports.studentsignup =catchAsyncErrors(async (req,res,next)=>{
    const student = await new Student(req.body).save();

    sendtoken(student , 201, res);
    
    // res.status(201).json(student)
    // res.json({message:"student sign in"})
})

exports.studentsignin = catchAsyncErrors(async (req,res,next)=>{

    // res.json(req.body)
    
    // res.json({message:"student sign in"})
    const student = await Student.findOne({email:req.body.email})
    .select("+password")
    .exec();
    if(!student) return next(new ErrorHandler("user not found with this email", 404));

    const isMatch = student.comparepassword(req.body.password);
    if(!isMatch) return next (new ErrorHandler("Wrong credentials " ,500));
    sendtoken(student , 200, res);

})

exports.studentsignout = catchAsyncErrors(async (req,res,next)=>{
    res.clearCookie("token")
    res.json({message:"successfully signout ! "})
    
})

exports.studentsendmail = catchAsyncErrors(async (req,res,next)=>{

    // res.json({message : "route is working"})

    const student =await Student.findOne({email:req.body.email}).exec();
    if(!student) return next(new ErrorHandler("user not found with this email", 404));


    //what to send in forget mail=  link of rest password 
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`

    sendmail(req,res,next,url);
    student.resetPasswordToken = "1";
    await student.save();
    res.json({student , url})
    
})


exports.studentforgetlink = catchAsyncErrors(async (req,res,next)=>{

    // res.json({message : "route is working"})

    const student =await Student.findById(req.params.id).exec();

    if(!student)
     return next(
        new ErrorHandler("user not found with this email", 404));

    if(student.resetPasswordToken == "1"){
        student.resetPasswordToken = "0";
        student.password = req.body.password;
        await student.save();
    }else{
        return next(
            new ErrorHandler("Invalid Reset Password link! Try again", 404));
    }
    res.status(200).json({
        message:"password has been changed successfully"
    })
        
    
  
})


exports.studentresetpassword = catchAsyncErrors(async (req,res,next)=>{

    const student =await Student.findById(req.id).exec();

        student.password = req.body.password;
        await student.save();


        sendtoken(student , 201, res);  //student firse reset ho jayga
    
  
})


exports.studentupdate =catchAsyncErrors(async (req,res,next)=>{


    // // Correct usage of findByIdAndUpdate without 'new'
    // const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true, // This ensures that the updated document is returned
    //     runValidators: true, // This runs the model's validators on update
    // });

    // if (!student) {
    //     // If student with the given id is not found
    //     return next(new ErrorHandler('Student not found', 404));
    // }

    // res.status(200).json({
    //     success: true,
    //     message: "Student updated successfully",
    //     student,
    // });

        await Student.findByIdAndUpdate(req.params.id , req.body).exec();
        res.status(200).json({
            success: true,
            message:"student updated successfully"
        })

})

exports.studentavatar = catchAsyncErrors(async (req,res,next)=>{
    const student =await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

        if(student.avatar.fileId !== ""){
            await imagekit.deleteFile(student.avatar.fileId)
        }
    const image = await imagekit.upload({
        file : file.data,
        fileName : modifiedFileName,
    })
    student.avatar = { fileId: image.fileId, url: image.url}
    await student.save();

    // res.json({image})
    res.status(200).json({
        success: true,
        message:"profile saved successfully"
    })
    // res.json({file : req.files.avatar})
  
})


//----------------Apply Internship-------------------------------------------------------------------

exports.applyinternship = catchAsyncErrors(async (req,res,next)=>{

    const student =await Student.findById(req.id).exec();
    const internship =await Internship.findById(req.params.internshipid).exec();

    student.internships.push(internship._id);
    internship.students.push(student._id)
    await student.save();
    await internship.save();
    res.json({student , internship})

  
})

//----------------Apply jobs-------------------------------------------------------------------


exports.applyjob = catchAsyncErrors(async (req,res,next)=>{

    const student =await Student.findById(req.id).exec();
    const job =await Job.findById(req.params.jobid).exec();

    student.jobs.push(job._id);
    job.students.push(student._id)
    await student.save();
    await job.save();
    res.json({student ,job})

  
})