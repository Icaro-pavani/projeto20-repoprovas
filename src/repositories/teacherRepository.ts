import { prisma } from "../config/database.js";

export async function findById(teacherId: number) {
  return prisma.teacher.findFirst({ where: { id: teacherId } });
}

export async function findTestsOrderByTeacher() {
  return prisma.teacherDisciplines.findMany({
    include: {
      teacher: {},
      discipline: {},
      tests: {
        include: {
          category: {},
        },
      },
    },
  });
}
