import repo from "../repositories/categorie.repo.js";
import { HttpError } from "../utils/httpError.js";

export default {

  async create(libelle) {
    if (!libelle || libelle.trim().length < 2) {
      throw new HttpError(422, "VALIDATION_ERROR", "libelle invalide");
    }

    return repo.create(libelle.trim());
  },

  async getAll(search) {
    const data = await repo.findAll();

    if (!search) return data;

    return data.filter(c =>
      c.libelle.toLowerCase().includes(search.toLowerCase())
    );
  },

  async getOne(id) {
    if (!Number.isInteger(id)) {
      throw new HttpError(400, "BAD_REQUEST", "id invalide");
    }

    const cat = await repo.findById(id);

    if (!cat) {
      throw new HttpError(404, "NOT_FOUND", "Categorie introuvable");
    }

    return cat;
  },

  async remove(id) {
    const ok = await repo.delete(id);

    if (!ok) {
      throw new HttpError(404, "NOT_FOUND", "Categorie introuvable");
    }
  }

};