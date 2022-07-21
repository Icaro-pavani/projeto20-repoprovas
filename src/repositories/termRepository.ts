import { prisma } from "../config/database.js";

export async function findTests() {
  return prisma.term.findMany({
    orderBy: { number: "asc" },
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            where: {
              tests: {
                some: { name: {} },
              },
            },
            include: {
              discipline: {},
              teacher: {},
              tests: {
                include: {
                  category: {},
                },
              },
            },
          },
          term: {},
        },
      },
    },
  });
}
