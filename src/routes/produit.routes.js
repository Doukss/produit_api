import { Router } from "express";
import {
  createProduit,
  getProduits,
  getProduit,
  updateProduit,
  deleteProduit,
} from "../controllers/produit.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createProduitSchema,
  updateProduitSchema,
} from "../validations/produit.schema.js";
import { upload } from "../middlewares/upload.js";
import { uploadToCloudinary } from "../utils/uploadcloudinary.js";

/**
 * @swagger
 * /produits:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               prix:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categorieId:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produit'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Liste de tous les produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produit'
 *
 * /produits/{id}:
 *   get:
 *     summary: Obtenir un produit par ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produit'
 *       404:
 *         description: Produit non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const router = Router();

router.post("/", upload.single("image"), createProduit);
router.get("/", getProduits);
router.get("/:id", getProduit);
router.delete("/:id", deleteProduit);

// router.put("/:id", upload.single("image"), updateProduit);
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier envoyé" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    res.status(200).json({
      message: "Upload réussi",
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
