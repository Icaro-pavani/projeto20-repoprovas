import { Request, Response } from "express";
import * as testRepository from "../repositories/testRepository.js";
import { CreateTestData } from "../schemas/testSchema.js";
import * as testService from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
  const testInfo: CreateTestData = res.locals.body;
  await testService.addNewTest(testInfo);

  res.sendStatus(201);
}

export async function getTestSortedByDisciplines(req: Request, res: Response) {
  const { groupBy }: any = req.query;
  if (groupBy === "disciplines") {
    const tests = await testService.obtainTestsByTerms();
    return res.status(200).send({ tests });
  }
  if (groupBy === "teachers") {
    const tests = await testService.obtainTestsByTeachers();
    return res.status(200).send({ tests });
  }

  const tests = await testService.getAllTests();
  res.status(200).send({ tests });
}
