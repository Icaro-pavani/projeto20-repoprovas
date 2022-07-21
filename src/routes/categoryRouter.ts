import { Router } from "express";
import getAllCategories from "../controllers/categoryController.js";
import validToken from "../middlewares/validToken.js";

const categoryRouter = Router();

categoryRouter.get("/categories", validToken, getAllCategories);

export default categoryRouter;
