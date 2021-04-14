require('dotenv').config(); // Required to run test
const { db } = require('../../config/db');

describe('Test de conexión a DB', () => {
  it('- debería de conectarse a base de datos y correr un query sencillo', async () => {
    const result = await db('SELECT 1');
    expect(result.length).toEqual(1);
  });
});
