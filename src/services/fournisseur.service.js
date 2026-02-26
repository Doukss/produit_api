import repo from "../repositories/fournisseur.repo.js";
import produitRepo from "../repositories/produit.repo.js";
import { HttpError } from "../utils/httpError.js";

export default {

  async create(data) {
    const { nom, email, telephone, produitsIds } = data;

    if (!nom || nom.trim().length < 2) {
      throw new HttpError(422, "VALIDATION_ERROR", "Nom invalide");
    }

    let produitsConnect = [];

    if (Array.isArray(produitsIds)) {
      for (const id of produitsIds) {
        const produit = await produitRepo.findById(id);
        if (!produit) {
          throw new HttpError(404, "NOT_FOUND", `Produit ${id} introuvable`);
        }
      }

      produitsConnect = produitsIds.map(id => ({ id }));
    }

    return repo.create({
      nom: nom.trim(),
      email,
      telephone,
      produits: {
        connect: produitsConnect
      }
    });
  },

  async getAll() {
    return repo.findAll();
  },

  async getOne(id) {
    const fournisseur = await repo.findById(id);

    if (!fournisseur) {
      throw new HttpError(404, "NOT_FOUND", "Fournisseur introuvable");
    }

    return fournisseur;
  },

  async update(id, data) {
    const fournisseur = await repo.findById(id);
    if (!fournisseur) {
      throw new HttpError(404, "NOT_FOUND", "Fournisseur introuvable");
    }

    return repo.update(id, data);
  },

  async remove(id) {
    const ok = await repo.delete(id);

    if (!ok) {
      throw new HttpError(404, "NOT_FOUND", "Fournisseur introuvable");
    }
  }

};