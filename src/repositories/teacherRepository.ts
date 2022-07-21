import { prisma } from "../config/database.js";

export async function findById(teacherId: number) {
  return prisma.teacher.findFirst({ where: { id: teacherId } });
}
