import { prisma } from "../config/database.js";

export async function findById(disciplineId: number) {
  return prisma.discipline.findFirst({ where: { id: disciplineId } });
}
