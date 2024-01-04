const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")  // password na dikhe for encryption of password
const jwt = require("jsonwebtoken")

const studentModel =new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true, "Email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        select:false,//not show in db
        maxLength:[15, "password should not excessds more than 15 character"],
        minLength:[6, "password should have at least 6 character"],
        // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]]
    }
},{timestamps:true}) //timestamp give updation time  creation time of studentmodel


//bcrypt
studentModel.pre("save" ,function(){

    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password , salt);
       
})


//for checking password manual method
studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password , this.password)
}


//tokem generation 
studentModel.methods.getjwttoken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE,
    });
}

const student = mongoose.model("student",studentModel);

module.exports = student;