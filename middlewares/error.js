// handles syncronous  errors
// show error in json format 
exports.generatedErrors=(err,req,res,next)=>{
        //for mongoservr error for dublicasy of user
    if(err.name === "MongoServerError" &&  err.message.includes("E11000 duplicate key")){
        err.message="Student with this email already exist "
    }


    const statusCode =err.statusCode || 500 ;
    res.status(statusCode).json({
        message:err.message,
        errName:err.name,
        stack:err.stack
    })


 }