import { Router } from "express";
import { getTeachersByDiscipline } from "../controllers/teacherController.js";
import validToken from "../middlewares/validToken.js";

const teacherRouter = Router();

teacherRouter.get("/teachers/:id", validToken, getTeachersByDiscipline);

export default teacherRouter;
