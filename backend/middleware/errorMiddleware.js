const { STATUS_CODES, MESSAGES } = require("../utils/setConflicts.js");
const errorHandler =(err,req,res,next)=>{
    console.error(err);
    res.status(err.status || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:err.message || MESSAGES.SERVER_ERROR,
    });
};

module.exports = errorHandler;