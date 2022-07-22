import * as teacherRepository from "../repositories/teacherRepository.js";

export async function obtainTeachersByDiscipline(disciplineId: number) {
  const teachers = await teacherRepository.findByDiscipline(disciplineId);
  return teachers;
}
