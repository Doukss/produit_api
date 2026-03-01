import repo from "../repositories/produit.repo.js";
import categorieRepo from "../repositories/categorie.repo.js";
import { HttpError } from "../utils/httpError.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Fonction upload Cloudinary
const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "produits" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });

export default {
  async create(data, file) {
    const { nom, prix, stock, categorieId, description } = data;
    const validePrix = parseFloat(prix);
    const valideStock = parseInt(stock, 10);
    const valideCategorieId = parseInt(categorieId, 10);

    if (!nom || nom.trim().length < 2) {
      throw new HttpError(422, "VALIDATION_ERROR", "Nom invalide");
    }

    if (isNaN(validePrix) || validePrix <= 0) {
      throw new HttpError(422, "VALIDATION_ERROR", "Prix invalide");
    }

    if (isNaN(valideStock) || valideStock < 0) {
      throw new HttpError(422, "VALIDATION_ERROR", "Stock invalide");
    }

    if (isNaN(valideCategorieId)) {
      throw new HttpError(422, "VALIDATION_ERROR", "categorieId invalide");
    }

    const categorie = await categorieRepo.findById(valideCategorieId);

    if (!categorie) {
      throw new HttpError(404, "NOT_FOUND", "Categorie introuvable");
    }

    let imageUrl = null;
    let imagePublicId = null;

    if (file) {
      const result = await uploadToCloudinary(file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    return repo.create({
      nom: nom.trim(),
      description,
      prix: validePrix,
      stock: valideStock,
      categorieId: valideCategorieId,
      imageUrl,
      imagePublicId
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

  async update(id, data, file) {
    const produit = await repo.findById(id);

    if (!produit) {
      throw new HttpError(404, "NOT_FOUND", "Produit introuvable");
    }

    let imageUrl = produit.imageUrl;
    let imagePublicId = produit.imagePublicId;

    if (file) {
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId);
      }

      const result = await uploadToCloudinary(file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    return repo.update(id, {
      ...data,
      imageUrl,
      imagePublicId
    });
  },

  async remove(id) {
    const produit = await repo.findById(id);

    if (!produit) {
      throw new HttpError(404, "NOT_FOUND", "Produit introuvable");
    }

    if (produit.imagePublicId) {
      await cloudinary.uploader.destroy(produit.imagePublicId);
    }

    await repo.delete(id);
  }
};