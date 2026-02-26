import service from "../services/categorie.service.js";
import { ok, created, noContent } from "../utils/response.js";

export const createCategorie = async (req, res, next) => {
  try {
    const cat = await service.create(req.body.libelle);
    return created(res, cat, `/categories/${cat.id}`);
  } catch (e) {
    next(e);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const data = await service.getAll(req.query.search);
    return ok(res, data);
  } catch (e) {
    next(e);
  }
};

export const getCategorie = async (req, res, next) => {
  try {
    const cat = await service.getOne(Number(req.params.id));
    return ok(res, cat);
  } catch (e) {
    next(e);
  }
};

export const deleteCategorie = async (req, res, next) => {
  try {
    await service.remove(Number(req.params.id));
    return noContent(res);
  } catch (e) {
    next(e);
  }
};