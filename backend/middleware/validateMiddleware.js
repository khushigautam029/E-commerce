const { STATUS_CODES } = require( "../utils/setConflicts.js");

const validate = (validation) =>{
    return (req,res,next)=>{
        const {error} = validation(req.body);

        if (error){
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success:false,
                message:error.details[0].message,
            });
        }
        next();
    }
}

module.exports = validate;