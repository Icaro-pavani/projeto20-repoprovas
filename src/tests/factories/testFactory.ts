import { prisma } from "../../config/database.js";

function createTestData() {
  return {
    name: "Prova teste",
    pdfUrl:
      "http://www2.ime.unicamp.br/~ma111/sites/default/files/P1_Calculo_1_2008_1S_A.pdf",
    categoryId: 3,
    disciplineId: 4,
    teacherId: 2,
  };
}

function createTestWrongCategory() {
  return {
    name: "Prova teste",
    pdfUrl:
      "http://www2.ime.unicamp.br/~ma111/sites/default/files/P1_Calculo_1_2008_1S_A.pdf",
    categoryId: 7,
    disciplineId: 4,
    teacherId: 2,
  };
}

function createTestWrongTeacherDisciplineCombination() {
  return {
    name: "Prova teste",
    pdfUrl:
      "http://www2.ime.unicamp.br/~ma111/sites/default/files/P1_Calculo_1_2008_1S_A.pdf",
    categoryId: 3,
    disciplineId: 1,
    teacherId: 2,
  };
}

const testFactory = {
  createTestData,
  createTestWrongCategory,
  createTestWrongTeacherDisciplineCombination,
};

export default testFactory;
