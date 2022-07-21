import supertest from "supertest";

import app from "../app.js";
import { prisma } from "../config/database.js";
import userFactory from "./factories/userFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

describe("User tests suite", () => {
  it("given email, password and wrong passwrodConfirmation, fail to create user", async () => {
    const userData = userFactory.createSignUp();
    userData.passwordConfirmation = "test";
    const response = await supertest(app).post("/sign-up").send(userData);
    expect(response.statusCode).toBe(422);
  });

  it("given email, password and passwordConfirmation, create user", async () => {
    const userData = userFactory.createSignUp();
    const response = await supertest(app).post("/sign-up").send(userData);
    expect(response.statusCode).toBe(201);
  });

  it("given email and password already registered, fail to create user", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    const userSameEmailData = userFactory.createSignUp();
    const response = await supertest(app)
      .post("/sign-up")
      .send(userSameEmailData);
    expect(response.statusCode).toBe(409);
  });

  it("given email and password already registered, login user", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    const response = await supertest(app).post("/sign-in").send(userData);
    console.log(response.body.token);
    const token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(token).not.toBeNull();
  });

  it("given email not registered and password, fail to login", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    const unregisteredUserData = userFactory.createSignUp("ttt@test.cc");
    delete unregisteredUserData.passwordConfirmation;
    const response = await supertest(app)
      .post("/sign-in")
      .send(unregisteredUserData);
    const token: string = response.body.token;
    expect(response.statusCode).toBe(404);
    expect(token).toBeUndefined();
  });

  it("given registered email and wrong password, fail to login", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    delete userData.passwordConfirmation;
    const wrongUserData = { ...userData, password: "tttt@tt.cc" };
    const response = await supertest(app).post("/sign-in").send(wrongUserData);
    const token = response.body.token;
    expect(response.statusCode).toBe(409);
    expect(token).toBeUndefined();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
