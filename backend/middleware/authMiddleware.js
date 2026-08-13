const jwt = require("jsonwebtoken");
const { MESSAGES, STATUS_CODES } = require( "../utils/setConflicts.js");
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            success: false,
            message: MESSAGES.ACCESS_DENIED,
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            success: false,
            message: MESSAGES.INVALID_TOKEN,
        });

    }
};

module.exports = verifyToken;