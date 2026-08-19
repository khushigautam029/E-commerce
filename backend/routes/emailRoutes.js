// const express = require("express");
// const router = express.Router();

// const sendEmail = require("../utils/sendEmail");
// const {
//     welcomeEmailTemplate,
// } = require("../utils/emailTemplates");


// // ======================================================
// // Test Email
// // ======================================================

// router.post("/test", async (req, res) => {
//     try {

//         const { email, username = "User" } = req.body || {};

//         if (!email) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email is required",
//             });
//         }

//         const emailTemplate = welcomeEmailTemplate(username);

//         await sendEmail({
//             to: email,
//             subject: emailTemplate.subject,
//             text: emailTemplate.text,
//             html: emailTemplate.html,
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Test email sent successfully",
//         });

//     } catch (error) {

//         console.error("Test Email Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Failed to send test email",
//             error: error.message,
//         });
//     }
// });


// module.exports = router;