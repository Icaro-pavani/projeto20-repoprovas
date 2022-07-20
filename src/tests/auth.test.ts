import supertest from "supertest";
import app from "../app.js";

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
});
