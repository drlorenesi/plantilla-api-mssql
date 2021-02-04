require('dotenv').config(); // Required to run test
const db = require('../../startup/db');

describe('Test de conexión a DB', () => {
  it('- debería de conectarse a base de datos y correr un query sencillo', async () => {
    const result = await db.query('SELECT 1');
    expect(result.rowsAffected[0]).toEqual(1);
  });
});
