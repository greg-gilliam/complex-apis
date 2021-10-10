const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  pwdHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.pwdHash = row.pwd_hash;
  }

  static async insert({ email, pwdHash }) {
    console.log(email, pwdHash, 'rows');
    const { rows } = await pool.query(
      `
      INSERT INTO users (email, pwd_hash)
      VALUES ($1, $2) 
      RETURNING *`,
      [email, pwdHash]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT * 
      FROM users 
      WHERE email = ($1)`,
      [email]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM users
    WHERE id = ($1)`,
      [id]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
    };
  }
};
