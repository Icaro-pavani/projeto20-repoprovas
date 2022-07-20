import * as testRepository from "../repositories/testRepository.js";
import { CreateTestData } from "../schemas/testSchema.js";

export async function addNewTest(testInfo: CreateTestData) {
  await testRepository.insert(testInfo);
}
