import joi from "joi"

export const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required(),
    phoneNumber: joi.string().required(),
    password: joi.string().required(),
    createdAt: joi.date()
})