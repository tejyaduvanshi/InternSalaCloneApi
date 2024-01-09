const Employe = require("../models/employeModel")
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const comparepassword =require("../models/employeModel")
const { sendtoken } = require("../utils/sendToken")
const { sendmail } = require("../utils/nodemailer")
const imagekit = require("../utils/imagekit").initImagekit();
const path = require("path")
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel")

//homepage /route

//without try catch we only use catchAsymvError

exports.hompage =catchAsyncErrors(async (req,res,next)=>{
    res.json({message:"secure employe homepage"})
})

exports.currentemploye =catchAsyncErrors(async (req,res,next)=>{

    const employe = await Employe.findById(req.id).exec()
    res.json({employe});
})


exports.employesignup =catchAsyncErrors(async (req,res,next)=>{
    const employe = await new Employe(req.body).save();

    sendtoken(employe , 201, res);
    
    // res.status(201).json(employe)
    // res.json({message:"employe sign in"})
})

exports.employesignin = catchAsyncErrors(async (req,res,next)=>{

    // res.json(req.body)
    
    // res.json({message:"employe sign in"})
    const employe = await Employe.findOne({email:req.body.email})
    .select("+password")
    .exec();
    if(!employe) return next(new ErrorHandler("employe not found with this email", 404));

    const isMatch = employe.comparepassword(req.body.password);
    if(!isMatch) return next (new ErrorHandler("Wrong credentials " ,500));
    sendtoken(employe , 200, res);

})

exports.employesignout = catchAsyncErrors(async (req,res,next)=>{
    res.clearCookie("token")
    res.json({message:"successfully signout ! "})
    
})

exports.employesendmail = catchAsyncErrors(async (req,res,next)=>{

    // res.json({message : "route is working"})

    const employe =await Employe.findOne({email:req.body.email}).exec();
    if(!employe) return next(new ErrorHandler("user not found with this email", 404));


    //what to send in forget mail=  link of rest password 
    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`

    sendmail(req,res,next,url);
    employe.resetPasswordToken = "1";
    await employe.save();
    res.json({employe , url})
    
})


exports.employeforgetlink = catchAsyncErrors(async (req,res,next)=>{

    // res.json({message : "route is working"})

    const employe =await Employe.findById(req.params.id).exec();

    if(!employe)
     return next(
        new ErrorHandler("Employe not found with this email", 404));

    if(employe.resetPasswordToken == "1"){
        employe.resetPasswordToken = "0";
        employe.password = req.body.password;
        await employe.save();
    }else{
        return next(
            new ErrorHandler("Invalid Reset Password link! Try again", 404));
    }
    res.status(200).json({
        message:"password has been changed successfully"
    })
        
    
  
})


exports.employeresetpassword = catchAsyncErrors(async (req,res,next)=>{

    const employe =await Employe.findById(req.id).exec();

        employe.password = req.body.password;
        await employe.save();


        sendtoken(employe , 201, res);  //employe firse reset ho jayga
    
  
})


exports.employeupdate =catchAsyncErrors(async (req,res,next)=>{

        await Employe.findByIdAndUpdate(req.params.id , req.body).exec();
        res.status(200).json({
            success: true,
            message:"employe updated successfully",
        })

})

exports.employeavatar = catchAsyncErrors(async (req,res,next)=>{
    const employe =await Employe.findById(req.params.id).exec();
    const file = req.files.organizationlogo;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

        if(employe.organizationlogo.fileId !== ""){
            await imagekit.deleteFile(employe.organizationlogo.fileId)
        }
    const image = await imagekit.upload({
        file : file.data,
        fileName : modifiedFileName,
    })
    employe.organizationlogo = { fileId: image.fileId, url: image.url}
    await employe.save();

    // res.json({image})
    res.status(200).json({
        success: true,
        message:"profile saved successfully"
    })
    // res.json({file : req.files.avatar})
  
})



//----------------------------------Internship----------------------------------------------------------------------


exports.createinternship = catchAsyncErrors(async(req,res,next)=>{
    const employe =await Employe.findById(req.id).exec();

    const internship = await new Internship(req.body);
    internship.employe = employe._id;
    employe.internships.push(internship._id);
    await internship.save()
    await employe.save()
    res.status(201).json({success: true , internship})
})

exports.readinternship = catchAsyncErrors(async(req,res,next)=>{

    const {internships} =await Employe.findById(req.id)
    .populate("internships")
    .exec();
    res.status(200).json({success: true , internships})
})


exports.readsingleinternship = catchAsyncErrors(async(req,res,next)=>{

    const internship = await Internship.findById(req.params.id).exec();

    res.status(200).json({success: true , internship})

})



//----------------------------------Internship----------------------------------------------------------------------
 


exports.createjob = catchAsyncErrors(async(req,res,next)=>{
    const employe =await Employe.findById(req.id).exec();

    const job = await new Job(req.body);
    job.employe = employe._id;
    employe.jobs.push(job._id);
    await job.save()
    await employe.save()
    res.status(201).json({success: true , job})
})

exports.readjob = catchAsyncErrors(async(req,res,next)=>{

    const {jobs} =await Employe.findById(req.id)
    .populate("jobs")
    .exec();
    res.status(200).json({success: true , jobs})
})


exports.readsinglejob = catchAsyncErrors(async(req,res,next)=>{

    const job = await Job.findById(req.params.id).exec();

    res.status(200).json({success: true , job})

})

