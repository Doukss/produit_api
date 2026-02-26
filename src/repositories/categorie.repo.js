import prisma from "../config/db.js";

export default {

  async findAll() {
    return prisma.categorie.findMany({
      orderBy: { id: "desc" }
    });
  },

  async findById(id) {
    return prisma.categorie.findUnique({
      where: { id }
    });
  },

  async create(libelle) {
    return prisma.categorie.create({
      data: { libelle }
    });
  },

  async delete(id) {
    try {
      await prisma.categorie.delete({
        where: { id }
      });
      return true;
    } catch {
      return false;
    }
  }

};