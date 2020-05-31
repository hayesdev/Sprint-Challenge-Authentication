const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

afterEach(async () => {
  await db("users").truncate();
});

// afterAll(async () => {
//   await db.destroy();
// });

// describe("joke tests", () => {
//   it("GET /api/jokes", async () => {
//     const res = await supertest(server).get("/api/jokes");
//     expect(res.statusCode).toBe(401);
//   });
//   it("GET /api/jokes", async () => {
//     const res = await supertest(server).get("/api/jokes");
//     expect(res.type).toBe("application/json");
//   });
// });

describe("auth tests", () => {
  it("POST /register", async () => {
    const data = { username: "ghayes", password: 123 };
    supertest(server)
      .post("/api/auth/register")
      .send(data)
      .then((res) => expect(res.statusCode).toBe(200))
      .catch((err) => console.log(err));
  });
});
describe("auth tests", () => {
  it("POST /register", async () => {
    const res = await supertest(server).get("/api/auth/register");
    expect(res.type).toBe("text/html");
  });
});

describe("auth tests", () => {
  it("POST /login", async () => {
    const data = { username: "ghayes", password: 123 };
    supertest(server)
      .post("/api/auth/register")
      .send(data)
      .then((res) => {
        supertest(server)
          .post("/api/auth/login")
          .send(data)
          .then(async (res) => {
            await console.log("new res", res);
            await expect(res.statusCode).toBe(200);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  //   it("POST /login", async () => {
  //     const res = await supertest(server).get("/api/login");

  //     expect(res.type).toBe("text/html");
  //   });
});

// describe("auth tests", () => {
//   it("GET /logout", async () => {
//     const data = { username: "ghayes", password: 123 };
//     const res = await supertest(server).post("/api/logout").send(data);
//     expect(res.statusCode).toBe(404);
//   });
//   it("POST /logout", async () => {
//     const res = await supertest(server).get("/api/logout");

//     expect(res.type).toBe("text/html");
//   });
// });
