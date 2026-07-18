const Database = require('better-sqlite3');
const path = require('path');

let bcrypt;
try {
  bcrypt = require('bcryptjs');
} catch (e) {
  try {
    bcrypt = require('bcrypt');
  } catch (err) {
    console.log("No se pudo requerir bcrypt/bcryptjs directamente. Usando hash estático de '123456'");
  }
}

const dbPath = path.join(__dirname, '.tmp', 'data.db');

async function run() {
  const db = new Database(dbPath);
  
  let hash;
  if (bcrypt) {
    const salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash('123456', salt);
    console.log("Hash generado dinámicamente:", hash);
  } else {
    // Un hash real de bcrypt para la contraseña '123456'
    hash = '$2a$10$TqySg5zNqC/ZgNn9.K49Oun1X5g437Q2k4X5P7yC1uN52Wd.g/5K.';
  }

  const user = db.prepare("SELECT * FROM up_users WHERE username = 'waw'").get();
  if (user) {
    console.log("Usuario 'waw' encontrado. Reseteando contraseña y configuraciones...");
    // Actualizar la contraseña, confirmed = 1, blocked = 0 y provider = 'local'
    const stmt = db.prepare("UPDATE up_users SET password = ?, confirmed = 1, blocked = 0, provider = 'local' WHERE username = 'waw'");
    const result = stmt.run(hash);
    console.log("Resultado del reseteo:", result);
    
    // También aseguremos que el rol sea el correcto. El rol Public (id 2) puede causar problemas de login.
    // Cambiemos el rol a Authenticated (id 1).
    try {
      db.prepare("UPDATE up_users_role_lnk SET role_id = 1 WHERE user_id = ?").run(user.id);
      console.log("Rol del usuario cambiado a 'Authenticated' (id 1) con éxito.");
    } catch (e) {
      console.log("Error al actualizar el rol:", e.message);
    }
  } else {
    console.log("El usuario 'waw' no existe. Creándolo...");
    
    const stmt = db.prepare("INSERT INTO up_users (username, email, password, confirmed, blocked, provider) VALUES ('waw', 'w@w.com', ?, 1, 0, 'local')");
    const result = stmt.run(hash);
    const userId = result.lastInsertRowid;
    console.log("Resultado de creación de usuario (ID):", userId);
    
    // Asociar con el rol Authenticated (id = 1)
    try {
      db.prepare("INSERT INTO up_users_role_lnk (user_id, role_id) VALUES (?, 1)").run(userId);
      console.log("Rol 'Authenticated' asignado con éxito.");
    } catch (e) {
      console.log("Error al crear enlace de rol:", e.message);
    }
  }
}

run().catch(console.error);
