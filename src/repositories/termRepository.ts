import { prisma } from "../config/database.js";

export async function findTests() {
  return prisma.term.findMany({
    orderBy: { number: "asc" },
    select: {
      number: true,
      Discipline: {
        select: {
          name: true,
          TeachersDisciplines: {
            select: {
              Test: {
                select: {
                  name: true,
                  pdfUrl: true,
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              teacher: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
