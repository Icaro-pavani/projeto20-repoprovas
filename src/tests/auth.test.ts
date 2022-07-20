import supertest from "supertest";
import app from "../app.js";
import { prisma } from "../config/database.js";

const EMAIL = "tt1@tt.cc";
const PASSWORD = "testtest";
const userData = { email: EMAIL, password: PASSWORD };

describe("USer tests suite", () => {
  it("given email and password, create user", async () => {
    const response = await supertest(app).post("/sign-up").send(userData);
    expect(response.statusCode).toBe(201);
  });

  it("given email and password already registered, fail to create user", async () => {
    const response = await supertest(app).post("/sign-up").send(userData);
    expect(response.statusCode).toBe(409);
  });

  it("given email and password already registered, login user", async () => {
    const response = await supertest(app).post("/sign-in").send(userData);
    console.log(response.body.token);
    const token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(token).not.toBeNull();
  });

  it("given email not registered and password, fail to login", async () => {
    const wrongUserData = { ...userData, email: "tttt@tt.cc" };
    const response = await supertest(app).post("/sign-in").send(wrongUserData);
    const token: string = response.body.token;
    expect(response.statusCode).toBe(404);
    expect(token).toBeUndefined();
  });

  it("given registered email and wrong password, fail to login", async () => {
    const wrongUserData = { ...userData, password: "tttt@tt.cc" };
    const response = await supertest(app).post("/sign-in").send(wrongUserData);
    const token = response.body.token;
    expect(response.statusCode).toBe(409);
    expect(token).toBeUndefined();
  });
});

afterAll(async () => {
  await prisma.user.delete({ where: { email: EMAIL } });
});
