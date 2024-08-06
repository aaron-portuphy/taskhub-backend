import joi from "joi"

export const taskerSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    selectACategory: joi.string().required().valid('Electrician', 'Plumber', 'Cleaner', 'Painter', 'Carpenter', 'Driver'),
    termsAccepted: joi.boolean().required(),
    createdAt: joi.date()
})