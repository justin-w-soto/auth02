const pool = require('../../utils/pool.js');

module.exports = class UserRole {

    constructor(row){
        this.id = row.id,
        this.role_title = row.role_title;
    }

    static async findRole(role_title){
        const { rows } = await pool.query('SELECT * FROM roles WHERE role_title=$1', [role_title.toUpperCase()]);
    
        if (!rows[0]) return null;
    
        return new UserRole(rows[0]);
      }
    
}

