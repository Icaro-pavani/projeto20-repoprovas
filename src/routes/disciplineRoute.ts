import { Router } from "express";
import { getDisciplines } from "../controllers/disciplineController.js";
import validToken from "../middlewares/validToken.js";

const disciplineRouter = Router();

disciplineRouter.get("/disciplines", validToken, getDisciplines);

export default disciplineRouter;
