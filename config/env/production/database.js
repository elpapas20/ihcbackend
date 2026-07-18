const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));
  
  return {
    connection: {
      client: 'postgres',
      connection: {
        host,
        port,
        database,
        user,
        password,
        ssl: { rejectUnauthorized: false }, // Requerido para conexiones seguras en la mayoría de los hostings
      },
      debug: false,
    },
  }
};