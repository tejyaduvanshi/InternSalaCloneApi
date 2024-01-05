require("dotenv").config({path : "./.env"})
const express = require("express")
const app = express();



//db connection 
require("./models/database").connectDatabase();

//logger 
const logger= require("morgan")
app.use(logger("tiny"))

//body-parser => req.body ko activate karne ke liye // initialise before routes
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET,
}));

app.use(cookieparser());

//express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());


//routes
app.use("/" , require("./routes/indexRouter"))




//error handling
const ErrorHandler = require("./utils/ErrorHandler")
const { generatedErrors } = require("./middlewares/error")
//app.all("*") handles all routes that dont match with made route
app.all("*",(req,res,next)=>{
    next(new ErrorHandler(`requested URL Not FOUND ${req.url}`),404)
})
app.use(generatedErrors);



app.listen(process.env.PORT,console.log(`server is running on port ${process.env.PORT}`))