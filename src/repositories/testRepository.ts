import { prisma } from "../config/database.js";
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
  const teacherDiscipline = await prisma.teachersDisciplines.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });

  return teacherDiscipline.id;
}
