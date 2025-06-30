import dotenv from "dotenv";

var caminho_env = '../.env';

dotenv.config({ path: caminho_env });

export const envVars = {
  dbPassword : process.env.DB_PASSWORD,
  dbHost : process.env.DB_HOST,
  dbDatabase : process.env.DB_DATABASE,
  dbUser : process.env.DB_USER,
};

console.log(envVars);