import Joi from "joi";

const authJoiSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

export default authJoiSchema;