const mongoose = require("mongoose")

const jobModel =new mongoose.Schema({
    students : [{ type:mongoose.Schema.Types.ObjectId , ref : "student"}],
    employe : { type:mongoose.Schema.Types.ObjectId , ref : "employe"},
    profile :String,
    skill:String,
    jobtype:{type:String,enum : [ "In office" , "Remote"]},
    openings: Number,
    description : String,
    preferences : String,
    salary : Number,
     perks : String,
     assessments : String,

},{timestamps:true}) //timestamp give updation time  creation time of studentmodel


//bcrypt
jobModel.pre("save" ,function(){

    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password , salt);
       
})


//for checking password manual method
jobModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password , this.password)
}


//tokem generation 
jobModel.methods.getjwttoken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE,
    });
}

const Job = mongoose.model("jobs",jobModel);

module.exports = Job;