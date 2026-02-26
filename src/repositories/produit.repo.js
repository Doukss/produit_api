import prisma from "../config/db.js";

export default {

  async findAll() {
    return prisma.produit.findMany({
      include: {
        categorie: true
      },
      orderBy: { id: "desc" }
    });
  },

  async findById(id) {
    return prisma.produit.findUnique({
      where: { id },
      include: { categorie: true }
    });
  },

  async create(data) {
    return prisma.produit.create({
      data
    });
  },

  async delete(id) {
    try {
      await prisma.produit.delete({
        where: { id }
      });
      return true;
    } catch {
      return false;
    }
  }

};