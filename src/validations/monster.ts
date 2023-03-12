import Joi from "joi";

const monsterJoiSchema = Joi.object({
    name: Joi.string().required(),
    nickname: Joi.string().required(),
    types: Joi.array().items(Joi.string()).min(1).required(),
    image: Joi.string().required(),
    description: Joi.string().optional(),
    height: Joi.string().optional(),
    weight: Joi.string().optional(),
    hp: Joi.number(),
    attack: Joi.number(),
    defense: Joi.number(),
    speed: Joi.number(),
});

export default monsterJoiSchema;