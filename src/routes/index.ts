import { Router } from "express";
import authRouter from "./authRouter.js";
import categoryRouter from "./categoryRouter.js";
import disciplineRouter from "./disciplineRoute.js";
import testRouter from "./testRouter.js";

const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(categoryRouter);
router.use(disciplineRouter);

export default router;
