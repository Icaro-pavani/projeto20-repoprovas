import axios from "axios";

const baseAPI = axios.create({
  baseURL: "https://ipt-repoprovas.herokuapp.com/",
});

interface UserData {
  email: string;
  password: string;
}

interface TestData {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
}

interface Code {
  code: string;
}

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signUp(signUpData: UserData) {
  await baseAPI.post("/sign-up", signUpData);
}

async function signIn(signInData: UserData) {
  return baseAPI.post<{ token: string }>("/sign-in", signInData);
}

async function postTest(postTestData: TestData, token: string) {
  const config = getConfig(token);
  await baseAPI.post("/tests", postTestData, config);
}

async function signInGitHub(data: Code) {
  return baseAPI.post<{ token: string }>("/authenticate", data);
}

export interface Term {
  id: number;
  number: number;
}

export interface Discipline {
  id: number;
  name: string;
  teacherDisciplines: TeacherDisciplines[];
  term: Term;
}

export interface TeacherDisciplines {
  id: number;
  discipline: Discipline;
  teacher: Teacher;
  tests: Test[];
}

export interface Teacher {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Test {
  id: number;
  name: string;
  pdfUrl: string;
  category: Category;
}

export type TestByDiscipline = Term & {
  disciplines: Discipline[];
};

export type TestByTeacher = TeacherDisciplines & {
  teacher: Teacher;
  disciplines: Discipline[];
  tests: Test[];
};

async function getTestsByDiscipline(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ tests: TestByDiscipline[] }>(
    "/tests?groupBy=disciplines",
    config
  );
}

async function getTestsByTeacher(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ tests: TestByTeacher[] }>(
    "/tests?groupBy=teachers",
    config
  );
}

async function getCategories(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ categories: Category[] }>("/categories", config);
}

async function getDisciplines(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ disciplines: Discipline[] }>("/disciplines", config);
}

async function getTeachersByDiscipline(token: string, disciplineId: number) {
  const config = getConfig(token);
  return baseAPI.get<{ teachers: { teacher: Teacher }[] }>(
    `/teachers/${disciplineId}`,
    config
  );
}

const api = {
  signUp,
  signIn,
  postTest,
  getTestsByDiscipline,
  getTestsByTeacher,
  getCategories,
  getDisciplines,
  getTeachersByDiscipline,
  signInGitHub,
};

export default api;
