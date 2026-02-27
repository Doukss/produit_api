import service from "../services/produit.service.js";
import { ok, created, noContent } from "../utils/response.js";

export const createProduit = async (req, res, next) => {
  try {
    const produit = await service.create(
      req.body,
      req.file // 👈 on passe le fichier ici
    );

    return created(res, produit, `/produits/${produit.id}`);
  } catch (e) {
    next(e);
  }
};

export const getProduits = async (req, res, next) => {
  try {
    const data = await service.getAll();
    return ok(res, data);
  } catch (e) {
    next(e);
  }
};

export const getProduit = async (req, res, next) => {
  try {
    const produit = await service.getOne(Number(req.params.id));
    return ok(res, produit);
  } catch (e) {
    next(e);
  }
};

export const updateProduit = async (req, res, next) => {
  try {
    const produit = await service.update(
      Number(req.params.id),
      req.body,
      req.file 
    );

    return ok(res, produit);
  } catch (e) {
    next(e);
  }
};

export const deleteProduit = async (req, res, next) => {
  try {
    await service.remove(Number(req.params.id));
    return noContent(res);
  } catch (e) {
    next(e);
  }
};