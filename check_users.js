const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '.tmp', 'data.db');

try {
  const db = new Database(dbPath, { readonly: true });
  
  // up_users is the table for end users in Strapi
  const users = db.prepare(`SELECT * FROM up_users`).all();
  console.log("Usuarios en up_users:", users);
  
  // Let's also check up_users_role_lnk to see what roles they have
  const roles = db.prepare(`SELECT * FROM up_users_role_lnk`).all();
  console.log("Roles Links:", roles);

  const roleNames = db.prepare(`SELECT * FROM up_roles`).all();
  console.log("Roles Names:", roleNames);

} catch (error) {
  console.error("Error al consultar la base de datos:", error);
}
