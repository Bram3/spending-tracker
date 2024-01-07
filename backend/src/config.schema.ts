import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    API_PORT: Joi.number().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().default(5432).required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    SECRET: Joi.string().required(),
    ALLOW_REGISTER: Joi.boolean().default(false).required()
});