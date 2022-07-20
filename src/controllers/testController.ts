import { Request, Response } from "express";
import { CreateTestData } from "../schemas/testSchema.js";
import * as testService from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
  const testInfo: CreateTestData = res.locals.body;
  await testService.addNewTest(testInfo);

  res.sendStatus(201);
}