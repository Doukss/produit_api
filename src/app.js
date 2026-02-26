import express from "express";
import categorieRoutes from "./routes/categorie.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import produitRoutes from "./routes/produit.routes.js";
import fournisseurRoutes from "./routes/fournisseur.routes.js";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger.js";

const app = express();

app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/categories", categorieRoutes);

app.use("/produits", produitRoutes);

app.use("/fournisseurs", fournisseurRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
