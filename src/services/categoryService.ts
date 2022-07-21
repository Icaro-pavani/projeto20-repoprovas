import * as categoryRepository from "../repositories/categoryRepository.js";

export async function obtainCategories() {
  const categories = await categoryRepository.findAll();
  return categories;
}
