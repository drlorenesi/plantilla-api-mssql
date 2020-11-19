const request = require('supertest');
const app = require('../../app');

describe('Punto de Ruta - /api/usuarios', () => {
  describe('GET /api/usuarios', () => {
    it('- deberia retornar 200', async () => {
      const response = await request(app).get('/api/usuarios');
      expect(response.statusCode).toBe(200);
    });
  });
});
