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

export async function findByDiscipline(disciplineId: number) {
  return prisma.teacherDisciplines.findMany({
    where: { disciplineId },
    include: {
      teacher: true,
    },
  });
}
