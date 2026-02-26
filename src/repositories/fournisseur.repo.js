import prisma from "../config/db.js";

export default {

  async findAll() {
    return prisma.fournisseur.findMany({
      include: {
        produits: true
      },
      orderBy: { id: "desc" }
    });
  },

  async findById(id) {
    return prisma.fournisseur.findUnique({
      where: { id },
      include: { produits: true }
    });
  },

  async create(data) {
    return prisma.fournisseur.create({
      data
    });
  },

  async update(id, data) {
    return prisma.fournisseur.update({
      where: { id },
      data
    });
  },

  async delete(id) {
    try {
      await prisma.fournisseur.delete({
        where: { id }
      });
      return true;
    } catch {
      return false;
    }
  }

};