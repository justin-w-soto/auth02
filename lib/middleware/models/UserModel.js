const pool = require('../../utils/pool.js');
const UserRole = require('../models/RoleModel.js');
const jwt = require('jsonwebtoken');

module.exports = class User {
    id;
    email;
    passwordHash;
    role;

    constructor(row) {
        this.id = row.id;
        this.email = row.email;
        this.passwordHash = row.password_hash;
        this.role = row.role;
    }

    static async insert ({ email, passwordHash, role }) {

        const rOle = await UserRole.findRole(role);

        const { rows } = await pool.query(
            'INSERT INTO user_table (email, password_hash, role_id) VALUES ($1, $2, $3) RETURNING *',
            [email, passwordHash, rOle.id]
        );
        return new User(rows[0], { role:rOle.role_title });
    }

// ----------------------------------------------------------------->>

    static async findByEmail(email) {
        const { rows } = await pool.query('SELECT * FROM user_table WHERE email=$1',
         [email]
         );
         if (!rows[0]) return null;

         return new User(rows[0]);
    }

// ----------------------------------------------------------------->>

static async get(id) {
    const { rows } = await pool.query('SELECT * FROM user_table WHERE id = $1', [
      id,
    ]);
    return new User(rows[0]);
  }

    toJSON() {
        return {
          id: this.id,
          email: this.email
        };

    }};

