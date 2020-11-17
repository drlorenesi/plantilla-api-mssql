require("dotenv").config();
const pool = require("../../startup/db");

describe("SQL Server connection test", () => {
  it("should connect to the database", async () => {
    const db = await pool.connect();
    expect(db._connected).toEqual(true);
  });
});
