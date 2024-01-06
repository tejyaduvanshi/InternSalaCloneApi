const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")  // password na dikhe for encryption of password
const jwt = require("jsonwebtoken")

const studentModel =new mongoose.Schema({
    firstname :{
        type:String,
        required:[true, "First Name is required"],
        minLength: [3,"Min length must be 4 character long"]

    },
    lastname :{
        type:String,
        required:[true, "Last Name is required"],
        minLength: [4,"Min length must be 4 character long"]


    },
    contact: {
        type:String,
        required:[true, "Contact is required"],
        minLength: [10,"Min length must be 10 digits"],
        maxLength: [10,"Max length must be 10 digits"]
    },
    city:{
        type:String,
        required:[true, "City Name is required"],
        minLength: [3,"Min length must be 3 character"],
    },
    gender :{
        type:String,enum : ["Male" , "Female" , "other"],
    },
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
    },
    avatar :{
        type: Object,
        default : {
            fileId :"",
            url : "https://images.unsplash.com/photo-1704241135858-2e10153afaec?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    },
    resetPasswordToken : {
        type: String,
        default: "0",
    },
    resume : {
        education :[],
        jobs:[],
        internships:[],
        responsibilities:[],
        courses:[],
        projects:[],
        skills:[],
        accomplishments:[],

    },
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