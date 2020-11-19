const request = require("supertest");
const app = require("../../app");

describe("Punto de Ruta API /", () => {
  describe("GET /", () => {
    it("- deberia retornar 200", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });
});