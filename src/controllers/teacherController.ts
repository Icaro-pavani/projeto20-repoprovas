import { Request, Response } from "express";
import * as teacherService from "../services/teacherService.js";

export async function getTeachersByDiscipline(req: Request, res: Response) {
  const disciplineId: number = parseInt(req.params.id);
  const disciplines = await teacherService.obtainTeachersByDiscipline(
    disciplineId
  );
  res.status(200).send({ disciplines });
}
