const request = require('supertest');
const app = require('../../app');

describe('API punto /', () => {
  describe('GET /', () => {
    it('- debería regresar respuesta del servidor 200', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  });
});
