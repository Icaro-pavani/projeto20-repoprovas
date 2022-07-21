import { TeacherDisciplines, Test } from "@prisma/client";
import Joi from "joi";

export type CreateTestData = Omit<Test, "id" | "teacherDisciplineId"> &
  Omit<TeacherDisciplines, "id">;

const testSchema = Joi.object<CreateTestData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  categoryId: Joi.number().integer().required(),
  disciplineId: Joi.number().integer().required(),
  teacherId: Joi.number().integer().required(),
});

export default testSchema;
