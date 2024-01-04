class ErrorHandler extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;  //we have passes message and statuscode (type of error 200, 202 , 404)
        Error.captureStackTrace(this,this.constructor) 
    }
}

module.exports=ErrorHandler;