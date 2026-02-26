import repo from "../repositories/produit.repo.js";
import categorieRepo from "../repositories/categorie.repo.js";
import { HttpError } from "../utils/httpError.js";

export default {
  async create(data) {
    const { nom, prix, stock, categorieId, description } = data;

    if (!nom || nom.trim().length < 2) {
      throw new HttpError(422, "VALIDATION_ERROR", "Nom invalide");
    }

    if (typeof prix !== "number" || prix <= 0) {
      throw new HttpError(422, "VALIDATION_ERROR", "Prix invalide");
    }

    if (!Number.isInteger(stock) || stock < 0) {
      throw new HttpError(422, "VALIDATION_ERROR", "Stock invalide");
    }

    if (!Number.isInteger(categorieId)) {
      throw new HttpError(422, "VALIDATION_ERROR", "categorieId invalide");
    }

    const categorie = await categorieRepo.findById(categorieId);

    if (!categorie) {
      throw new HttpError(404, "NOT_FOUND", "Categorie introuvable");
    }

    return repo.create({
      nom: nom.trim(),
      description,
      prix,
      stock,
      categorieId,
    });
  },

  async getAll() {
    return repo.findAll();
  },

  async getOne(id) {
    const produit = await repo.findById(id);

    if (!produit) {
      throw new HttpError(404, "NOT_FOUND", "Produit introuvable");
    }

    return produit;
  },

  async update(id, data) {
    const produit = await repo.findById(id);

    if (!produit) {
      throw new HttpError(404, "NOT_FOUND", "Produit introuvable");
    }

    return repo.update(id, data);
  },

  async remove(id) {
    const ok = await repo.delete(id);

    if (!ok) {
      throw new HttpError(404, "NOT_FOUND", "Produit introuvable");
    }
  },
};
