const Joi = require('joi')

const socialHandleSchema = Joi.object({
    website: Joi.string().allow('').pattern(new RegExp("^(https?:\\/\\/)?.+$")),
    twitter: Joi.string().allow('').pattern(new RegExp("^https:\\/\\/twitter\\.com\\/([a-zA-Z0-9_]+)\\/?(\\?.*)?$")),
    youtube: Joi.string().allow('').pattern(new RegExp("^https:\\/\\/www\\.youtube\\.com\\/user\\/([a-zA-Z0-9_-]+)\\/?(\\?.*)?$")),
    linkedin: Joi.string().allow('').pattern(new RegExp("^https:\\/\\/www\\.linkedin\\.com\\/in\\/([a-zA-Z0-9-]+)\\/?(\\?.*)?$")),
    facebook: Joi.string().allow('').pattern(new RegExp("^https:\\/\\/www\\.facebook\\.com\\/([a-zA-Z0-9.]+)\\/?(\\?.*)?$"))
}).min(1);

module.exports = socialHandleSchema


// const websiteValidate = Joi.object({
//     websiteAddress: Joi.string()
//         .pattern(new RegExp("^(https?:\\/\\/)?(www\\.)?([a-zA-Z0-9-]+\\.)+([a-zA-Z]{2,})(\\/[^\\s]*)?$"))
//         .required()
//         .messages({
//             "string.pattern.base": `Please enter a valid website address`,
//             "string.empty": `Website address cannot be empty`,
//             "any.required": `Website address is required`,
//         }),
// });


// const facebookValidate = Joi.object({
//     facebookURL: Joi.string()
//         .pattern(new RegExp("^https:\\/\\/www\\.facebook\\.com\\/([a-zA-Z0-9.]+)\\/?(\\?.*)?$"))
//         .required()
//         .messages({
//             "string.pattern.base": `Please enter a valid Facebook URL`,
//             "string.empty": `Facebook URL cannot be empty`,
//             "any.required": `Facebook URL is required`,
//         }),
// });


// const twitterValidate = Joi.object({
//     twitterURL: Joi.string()
//         .pattern(new RegExp("^https:\\/\\/twitter\\.com\\/([a-zA-Z0-9_]+)\\/?(\\?.*)?$"))
//         .required()
//         .messages({
//             "string.pattern.base": `Please enter a valid Twitter URL`,
//             "string.empty": `Twitter URL cannot be empty`,
//             "any.required": `Twitter URL is required`,
//         }),
// });

// const youtubeValidate = Joi.object({
//     youtubeURL: Joi.string()
//         .pattern(new RegExp("^https:\\/\\/www\\.youtube\\.com\\/user\\/([a-zA-Z0-9_-]+)\\/?(\\?.*)?$"))
//         .required()
//         .messages({
//             "string.pattern.base": `Please enter a valid YouTube URL`,
//             "string.empty": `YouTube URL cannot be empty`,
//             "any.required": `YouTube URL is required`,
//         }),
// });
// const linkedInValidate = Joi.object({
//     linkedinURL: Joi.string()
//         .pattern(new RegExp("^https:\\/\\/www\\.linkedin\\.com\\/in\\/([a-zA-Z0-9-]+)\\/?(\\?.*)?$"))
//         .required()
//         .messages({
//             "string.pattern.base": `Please enter a valid LinkedIn URL`,
//             "string.empty": `LinkedIn URL cannot be empty`,
//             "any.required": `LinkedIn URL is required`,
//         }),
// });

// module.exports = { websiteValidate, facebookValidate, twitterValidate, youtubeValidate, linkedInValidate };