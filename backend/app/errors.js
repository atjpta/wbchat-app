class BadRequestError extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

class errorHandler {
    constructor(){
        this.hanleError = (error, responseStream = null) => {
            if(responseStream){
                responseStream.status(error.statusCode || 500).json({
                    message: error.message || "internal Server Error",
                });
            }
            else{
                console.log(error);
            }
        };
    }
}
module.exports = {
    BadRequestError,
    errorHandler: new errorHandler(),
};