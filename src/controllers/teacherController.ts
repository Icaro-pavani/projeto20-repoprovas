import { Request, Response } from "express";
import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import * as teacherService from "../services/teacherService.js";

export async function getTeachersByDiscipline(req: Request, res: Response) {
  const disciplineId: number = parseInt(req.params.id);
  if (!disciplineId) {
    throw unprocessableError("The discipline id must be a integer");
  }
  const teachers = await teacherService.obtainTeachersByDiscipline(
    disciplineId
  );
  res.status(200).send({ teachers });
}
