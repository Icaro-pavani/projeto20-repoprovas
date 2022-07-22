import * as disciplineRepository from "../repositories/disciplineRepository.js";

export async function obtainAllDisciplines() {
  const disciplines = await disciplineRepository.findAll();
  return disciplines;
}
