import { Router } from "express";
import {
  createTest,
  getTestSortedByDisciplines,
} from "../controllers/testController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/tests", validToken, validSchema(testSchema), createTest);
testRouter.get("/tests", validToken, getTestSortedByDisciplines);

export default testRouter;
