import * as categoryRepository from "../repositories/categoryRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as testRepository from "../repositories/testRepository.js";
import * as termRepository from "../repositories/termRepository.js";
import { CreateTestData } from "../schemas/testSchema.js";
import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";

export async function addNewTest(testInfo: CreateTestData) {
  const { categoryId, disciplineId, teacherId } = testInfo;
  const category = await categoryRepository.findById(categoryId);
  const discipline = await disciplineRepository.findById(disciplineId);
  const teacher = await teacherRepository.findById(teacherId);
  if (!category || !discipline || !teacher) {
    throw unprocessableError("There is no category with this Id!");
  }
  await testRepository.insert(testInfo);
}

export async function obtainTestsByTerms() {
  return await termRepository.findTests();
}
