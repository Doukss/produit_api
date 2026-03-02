
import { Router } from "express";
import categorieRoutes from "./categorie.routes.js";
import produitRoutes from "./produit.routes.js";
import fournisseurRoutes from "./fournisseur.routes.js";


const router = Router();

router.use("/categories", categorieRoutes);
router.use("/produits", produitRoutes);
router.use("/fournisseurs", fournisseurRoutes);

export default router;