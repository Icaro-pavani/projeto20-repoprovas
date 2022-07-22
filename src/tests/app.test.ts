import supertest from "supertest";

import app from "../app.js";
import { prisma } from "../config/database.js";
import testFactory from "./factories/testFactory.js";
import userFactory from "./factories/userFactory.js";

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
  await prisma.$executeRaw`DELETE FROM tests`;
});

describe("User tests suite", () => {
  it("given email, password and wrong passwrodConfirmation, fail to create user", async () => {
    const userData = userFactory.createSignUp();
    userData.passwordConfirmation = "test";
    const response = await agent.post("/sign-up").send(userData);
    expect(response.statusCode).toBe(422);
  });

  it("given email, password and passwordConfirmation, create user", async () => {
    const userData = userFactory.createSignUp();
    const response = await agent.post("/sign-up").send(userData);
    expect(response.statusCode).toBe(201);
  });

  it("given email and password already registered, fail to create user", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    const userSameEmailData = userFactory.createSignUp();
    const response = await agent.post("/sign-up").send(userSameEmailData);
    expect(response.statusCode).toBe(409);
  });

  it("given email and password already registered, login user", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    const response = await agent.post("/sign-in").send(userData);
    const token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(token).not.toBeNull();
  });

  it("given email not registered and password, fail to login", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    const unregisteredUserData = userFactory.createSignUp("ttt@test.cc");
    delete unregisteredUserData.passwordConfirmation;
    const response = await agent.post("/sign-in").send(unregisteredUserData);
    const token: string = response.body.token;
    expect(response.statusCode).toBe(404);
    expect(token).toBeUndefined();
  });

  it("given registered email and wrong password, fail to login", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    const wrongUserData = { ...userData, password: "tttt@tt.cc" };
    const response = await agent.post("/sign-in").send(wrongUserData);
    const token = response.body.token;
    expect(response.statusCode).toBe(409);
    expect(token).toBeUndefined();
  });
});

describe("Tests route suite", () => {
  it("given correct test data, create new test", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    let response = await agent.post("/sign-in").send(userData);
    const token = response.body.token;

    const testData = testFactory.createTestData();
    response = await agent
      .post("/tests")
      .send(testData)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    const testRegistered = await prisma.test.findFirst({
      where: { name: testData.name },
    });
    expect(testRegistered).not.toBeNull();
  });

  it("given incorrect test data, fail to create new test", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    let response = await agent.post("/sign-in").send(userData);
    const token = response.body.token;

    const testData = testFactory.createTestWrongCategory();
    response = await agent
      .post("/tests")
      .send(testData)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(422);
    const testRegistered = await prisma.test.findFirst({
      where: { name: testData.name },
    });
    expect(testRegistered).toBeNull();
  });

  it("given incorrect test data, fail to create new test", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    let response = await agent.post("/sign-in").send(userData);
    const token = response.body.token;

    const testData = testFactory.createTestWrongTeacherDisciplineCombination();
    response = await agent
      .post("/tests")
      .send(testData)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(422);
    const testRegistered = await prisma.test.findFirst({
      where: { name: testData.name },
    });
    expect(testRegistered).toBeNull();
  });

  it("given correct test data and without token, fail to create new test", async () => {
    const testData = testFactory.createTestWrongTeacherDisciplineCombination();
    const response = await agent.post("/tests").send(testData);

    expect(response.status).toBe(401);
    const testRegistered = await prisma.test.findFirst({
      where: { name: testData.name },
    });
    expect(testRegistered).toBeNull();
  });

  it("get tests sorted by terms", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    let response = await agent.post("/sign-in").send(userData);
    const token = response.body.token;

    response = await agent
      .get("/tests?groupBy=disciplines")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.tests).toHaveLength(6);
  });

  it("get tests sorted by teachers", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    let response = await agent.post("/sign-in").send(userData);
    const token = response.body.token;

    response = await agent
      .get("/tests?groupBy=teachers")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.tests).toHaveLength(6);
  });

  it("add one test and get with its route", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    let response = await agent.post("/sign-in").send(userData);
    const token = response.body.token;

    const testData = testFactory.createTestData();
    response = await agent
      .post("/tests")
      .send(testData)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);

    response = await agent
      .get("/tests")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.tests).toHaveLength(1);
  });
});

describe("Single routes tests", () => {
  it("get categories", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    let response = await agent.post("/sign-in").send(userData);
    const token = response.body.token;

    response = await agent
      .get("/categories")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.categories).toHaveLength(3);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
