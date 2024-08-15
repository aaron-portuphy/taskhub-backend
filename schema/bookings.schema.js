import joi from "joi";

export const bookingsSchema = joi.object({
    streetAddress: joi.string().min(1).max(255).required(),
    houseOrAptNumber: joi.string().min(1).max(50).required(),
    size: joi.string().valid('Small', 'Medium', 'Large').required(),
    details: joi.string().min(1).max(1000).required(),
    summary: joi.string().min(1).max(255).required(),
    taskDate: joi.date().required(),
    startTime: joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d) (AM|PM)$/).required(),
})