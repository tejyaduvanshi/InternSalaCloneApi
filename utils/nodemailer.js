// const nodemailer = require("nodemailer");
// const ErrorHandler = require("./ErrorHandler");



// exports.sendmail = (req,res,next,url) => {
//     const transport = nodemailer.createTransport({
//         service: "gmail",
//         host : "smpt.gmail.com",
//         post: 465,
//         auth :{
//             user:process.env.MAIL_EMAIL_ADDRESS,
//             pass:process.env.MAIL_PASSWORD,


//         }
//     });

//     const mailOption ={
//         from : "TEJ PRIVATE LIMITED",
//         to : req.body.email,
//         subject:"password rest link",
//         // "text" : "donot share this link"
//         html: `<h1>Click link below to rest password </h1>
//                     <a href="${url}">Password rest link</a>`

//     };

//     transport.sendMail(mailOption), (err,info)=>{

//         if(err) return next( new ErrorHandler(err, 500));
//         console.log(info);
//         return res.status(200).json({
//             message: "mail sent successfully !"
            
//         })


//     };

// }