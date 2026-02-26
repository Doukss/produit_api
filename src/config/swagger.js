import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gestion Produit API",
      version: "1.0.0",
      description:
        "API pour la gestion des produits, catégories et fournisseurs",
      contact: {
        name: "API Support",
        email: "support@gestionproduit.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement",
      },
    ],
    components: {
      schemas: {
        Categorie: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            libelle: { type: "string", example: "Électronique" },
          },
        },
        CreateCategorie: {
          type: "object",
          required: ["libelle"],
          properties: {
            libelle: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Électronique",
            },
          },
        },
        Produit: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nom: { type: "string", example: "Ordinateur portable" },
            description: { type: "string", example: "PC haut de gamme" },
            prix: { type: "number", example: 999.99 },
            stock: { type: "integer", example: 50 },
            categorieId: { type: "integer", example: 1 },
            categorie: { $ref: "#/components/schemas/Categorie" },
          },
        },
        CreateProduit: {
          type: "object",
          required: ["nom", "prix", "stock", "categorieId"],
          properties: {
            nom: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Ordinateur portable",
            },
            description: {
              type: "string",
              maxLength: 500,
              example: "PC haut de gamme",
              nullable: true,
            },
            prix: { type: "number", positive: true, example: 999.99 },
            stock: { type: "integer", minimum: 0, example: 50 },
            categorieId: { type: "integer", positive: true, example: 1 },
          },
        },
        Fournisseur: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nom: { type: "string", example: "TechCorp" },
            email: {
              type: "string",
              format: "email",
              example: "contact@techcorp.com",
            },
            telephone: { type: "string", example: "1234567890" },
            produits: {
              type: "array",
              items: { $ref: "#/components/schemas/Produit" },
            },
          },
        },
        CreateFournisseur: {
          type: "object",
          required: ["nom"],
          properties: {
            nom: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "TechCorp",
            },
            email: {
              type: "string",
              format: "email",
              example: "contact@techcorp.com",
            },
            telephone: {
              type: "string",
              pattern: "^[0-9]{9,15}$",
              example: "1234567890",
            },
            produitsIds: {
              type: "array",
              items: { type: "integer" },
              example: [1, 2, 3],
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            statusCode: { type: "integer", example: 404 },
            message: { type: "string", example: "Ressource non trouvée" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export const specs = swaggerJsdoc(options);
