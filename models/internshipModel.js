const mongoose = require("mongoose")

const internshipModel =new mongoose.Schema({
    students : [{ type:mongoose.Schema.Types.ObjectId , ref : "student"}],
    employe : { type:mongoose.Schema.Types.ObjectId , ref : "employe"},
    profile :String,
    skill:String,
    internshiptype:{type:String,enum : [ "In office" , "Remote"]},
    openings: Number,
    from : String,
    to : String,
    duration : String,
    responsibility : String,
    stipend : {status :{ type : String , enum : ["Fixed" , "Negotiable","Performance Based" , "Unpaid"]}, amount : Number},
    perks : String,
    assessments : String,
},{timestamps:true}) //timestamp give updation time  creation time of studentmodel


//bcrypt
internshipModel.pre("save" ,function(){

    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password , salt);
       
})


//for checking password manual method
internshipModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password , this.password)
}


//tokem generation 
internshipModel.methods.getjwttoken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE,
    });
}

const Internship = mongoose.model("internships",internshipModel);

module.exports = Internship;