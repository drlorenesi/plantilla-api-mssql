require('dotenv').config();
const pool = require('../../startup/db');

let db;

describe('Conexion a Base de Datos', () => {
  beforeAll(async () => {
    db = await pool.connect();
  });
  afterAll(async () => {
    pool.close();
  });
  it('- deberia conectarse a base de datos', async () => {
    expect(db._connected).toEqual(true);
  });
});
