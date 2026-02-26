import service from "../services/fournisseur.service.js";
import { ok, created, noContent } from "../utils/response.js";

export const createFournisseur = async (req, res, next) => {
  try {
    const fournisseur = await service.create(req.body);
    return created(res, fournisseur, `/fournisseurs/${fournisseur.id}`);
  } catch (e) {
    next(e);
  }
};

export const getFournisseurs = async (req, res, next) => {
  try {
    return ok(res, await service.getAll());
  } catch (e) {
    next(e);
  }
};

export const getFournisseur = async (req, res, next) => {
  try {
    return ok(res, await service.getOne(Number(req.params.id)));
  } catch (e) {
    next(e);
  }
};

export const updateFournisseur = async (req, res, next) => {
  try {
    return ok(res, await service.update(Number(req.params.id), req.body));
  } catch (e) {
    next(e);
  }
};

export const deleteFournisseur = async (req, res, next) => {
  try {
    await service.remove(Number(req.params.id));
    return noContent(res);
  } catch (e) {
    next(e);
  }
};