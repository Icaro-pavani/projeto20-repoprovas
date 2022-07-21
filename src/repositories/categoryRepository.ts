import { prisma } from "../config/database.js";

export async function findById(categoryId: number) {
  return prisma.category.findFirst({ where: { id: categoryId } });
}
