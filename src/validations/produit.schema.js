import Joi from "joi";

export const createProduitSchema = Joi.object({
  nom: Joi.string().min(2).max(100).required(),

  description: Joi.string().max(500).allow(null, ""),

  prix: Joi.number().positive().precision(2).required(),

  stock: Joi.number().integer().min(0).required(),

  categorieId: Joi.number().integer().positive().required()
});

export const updateProduitSchema = createProduitSchema.fork(
  ["nom", "prix", "stock", "categorieId"],
  field => field.optional()
);