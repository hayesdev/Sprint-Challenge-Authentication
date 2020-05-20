const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

afterAll(async () => {
  await db.destroy();
});

describe("joke tests", () => {
  it("GET /api/jokes", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.statusCode).toBe(401);
  });
  it("GET /api/jokes", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.type).toBe("application/json");
  });
});

describe("auth tests", () => {
  it("POST /register", async () => {
    const data = { username: "ghayes", password: 123 };
    const res = await supertest(server).post("/api/register").send(data);
    expect(res.statusCode).toBe(404);
  });
  it("POST /register", async () => {
    const res = await supertest(server).get("/api/register");

    expect(res.type).toBe("text/html");
  });
});

describe("auth tests", () => {
  it("POST /login", async () => {
    const data = { username: "ghayes", password: 123 };
    const res = await supertest(server).post("/api/login").send(data);
    expect(res.statusCode).toBe(404);
  });
  it("POST /login", async () => {
    const res = await supertest(server).get("/api/login");

    expect(res.type).toBe("text/html");
  });
});

describe("auth tests", () => {
  it("GET /logout", async () => {
    const data = { username: "ghayes", password: 123 };
    const res = await supertest(server).post("/api/logout").send(data);
    expect(res.statusCode).toBe(404);
  });
  it("POST /logout", async () => {
    const res = await supertest(server).get("/api/logout");

    expect(res.type).toBe("text/html");
  });
});
