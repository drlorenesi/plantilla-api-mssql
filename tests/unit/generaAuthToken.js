require('dotenv').config(); // Required to run test
const generaAuthToken = require('../../utils/generaAuthToken');
const jwt = require('jsonwebtoken');

describe('Genera un Auth Token', () => {
  it('- debería retornar un JWT válido', () => {
    const payload = { user_id: 1, nombre: 'Juan' };
    const token = generaAuthToken(payload, process.env.jwtPrivateKey);
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    expect(decoded).toMatchObject({ user_id: 1, nombre: 'Juan' });
  });
});
