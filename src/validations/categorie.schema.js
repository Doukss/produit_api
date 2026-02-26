import Joi from "joi";

export const createCategorieSchema = Joi.object({
  libelle: Joi.string().min(2).max(100).required()
});

export const updateCategorieSchema = createCategorieSchema.fork(
  ["libelle"],
  field => field.optional()
);