import { prisma } from "../config/database.js";
import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import { CreateTestData } from "../schemas/testSchema.js";

export async function insert(testInfo: CreateTestData) {
  const { name, pdfUrl, categoryId, disciplineId, teacherId }: CreateTestData =
    testInfo;
  const teacherDisciplineId = await findTeacherDisciplineId(
    disciplineId,
    teacherId
  );
  return prisma.test.create({
    data: {
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId,
    },
  });
}

async function findTeacherDisciplineId(
  disciplineId: number,
  teacherId: number
) {
  const teacherDiscipline = await prisma.teacherDisciplines.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });

  if (!teacherDiscipline) {
    throw unprocessableError(
      "This combination of teacher and discipline doesn't exist!"
    );
  }

  return teacherDiscipline.id;
}

export async function findAll() {
  return prisma.test.findMany({
    include: {
      category: {},
      teacherDispline: {
        include: {
          discipline: {
            include: {
              term: {},
            },
          },
          teacher: {},
        },
      },
    },
  });
}
