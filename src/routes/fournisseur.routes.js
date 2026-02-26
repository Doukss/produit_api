import { Router } from "express";
import {
  createFournisseur,
  getFournisseurs,
  getFournisseur,
  updateFournisseur,
  deleteFournisseur,
} from "../controllers/fournisseur.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createFournisseurSchema,
  updateFournisseurSchema,
} from "../validations/fournisseur.schema.js";

/**
 * @swagger
 * /fournisseurs:
 *   post:
 *     summary: Créer un nouveau fournisseur
 *     tags: [Fournisseurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFournisseur'
 *     responses:
 *       201:
 *         description: Fournisseur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fournisseur'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Liste de tous les fournisseurs
 *     tags: [Fournisseurs]
 *     responses:
 *       200:
 *         description: Liste des fournisseurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fournisseur'
 *
 * /fournisseurs/{id}:
 *   get:
 *     summary: Obtenir un fournisseur par ID
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du fournisseur
 *     responses:
 *       200:
 *         description: Fournisseur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fournisseur'
 *       404:
 *         description: Fournisseur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Mettre à jour un fournisseur
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du fournisseur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFournisseur'
 *     responses:
 *       200:
 *         description: Fournisseur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fournisseur'
 *       404:
 *         description: Fournisseur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Supprimer un fournisseur
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du fournisseur
 *     responses:
 *       200:
 *         description: Fournisseur supprimé avec succès
 *       404:
 *         description: Fournisseur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const router = Router();

router.post("/", validate(createFournisseurSchema), createFournisseur);
router.get("/", getFournisseurs);
router.get("/:id", getFournisseur);
router.put("/:id", validate(updateFournisseurSchema), updateFournisseur);
router.delete("/:id", deleteFournisseur);

export default router;
