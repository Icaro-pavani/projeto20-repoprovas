import { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";

export default async function getAllCategories(req: Request, res: Response) {
  const categories = await categoryService.obtainCategories();

  res.status(200).send({ categories });
}
