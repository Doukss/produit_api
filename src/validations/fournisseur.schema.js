import Joi from "joi";

export const createFournisseurSchema = Joi.object({
  nom: Joi.string().min(2).max(100).required(),

  email: Joi.string().email().optional(),

  telephone: Joi.string()
    .pattern(/^[0-9]{9,15}$/)
    .optional(),

  produitsIds: Joi.array()
    .items(Joi.number().integer().positive())
    .optional()
});

export const updateFournisseurSchema = createFournisseurSchema.fork(
  ["nom"],
  field => field.optional()
);