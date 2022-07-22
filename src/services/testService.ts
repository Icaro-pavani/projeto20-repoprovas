import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import * as categoryRepository from "../repositories/categoryRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as testRepository from "../repositories/testRepository.js";
import * as termRepository from "../repositories/termRepository.js";
import { CreateTestData } from "../schemas/testSchema.js";
import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import * as userRepository from "../repositories/userRepository.js";

export async function addNewTest(testInfo: CreateTestData) {
  const { categoryId, disciplineId, teacherId } = testInfo;
  const category = await categoryRepository.findById(categoryId);
  const discipline = await disciplineRepository.findById(disciplineId);
  const teacher = await teacherRepository.findById(teacherId);
  if (!category || !discipline || !teacher) {
    throw unprocessableError("Wrong category, discipline or teacher Id!");
  }
  await testRepository.insert(testInfo);

  const users = await userRepository.findAll();

  const to = users.map((user) => user.email);

  const message = {
    to,
    from: process.env.SENDER_EMAIL,
    subject: "Nova prova adicionada em RepoProvas",
    text: `A seguinte prova foi adicionadas: ${testInfo.name} (${discipline.name})`,
  };

  sgMail
    .send(message)
    .then(() => console.log("Mail sent successfully"))
    .catch((error) => console.log(error));
}

export async function obtainTestsByTerms() {
  return await termRepository.findTestsOrderByTerm();
}

export async function obtainTestsByTeachers() {
  return await teacherRepository.findTestsOrderByTeacher();
}

export async function getAllTests() {
  return await testRepository.findAll();
}
