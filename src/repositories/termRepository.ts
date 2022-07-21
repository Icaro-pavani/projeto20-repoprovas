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
                orderBy: { category: { name: "asc" } },
                select: {
                  category: {
                    select: {
                      name: true,
                      Test: {
                        select: {
                          name: true,
                          pdfUrl: true,
                          teacherDispline: {
                            select: {
                              teacher: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}
