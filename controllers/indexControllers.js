const Student = require("../models/studentModel")
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const comparepassword =require("../models/studentModel")
const { sendtoken } = require("../utils/sendToken")
const { sendmail } = require("../utils/nodemailer")

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

    const student =await Student.findOne({email:req.body.email}).exec();
    if(!student) return next(new ErrorHandler("user not found with this email", 404));

    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`

    sendmail(req,res,next,url)


    res.json({student , url})
    
})

