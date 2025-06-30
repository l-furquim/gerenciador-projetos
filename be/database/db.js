import mysql from "mysql2";
import { envVars } from "../env/env.js";

const mySqlConfig = {
  host: envVars.dbHost,
  database: envVars.dbDatabase,
  user: envVars.dbUser,
  password: envVars.dbPassword,
  port: 3306,
};

export function executar(instrucao, parametros = []) {
  return new Promise((resolve, reject) => {
    const conexao = mysql.createConnection(mySqlConfig);

    conexao.connect((connectErr) => {
      if (connectErr) {
        console.error("Erro ao conectar no banco:", connectErr.message);
        reject(connectErr);
        return;
      }

      conexao.query(instrucao, parametros, (erro, resultados) => {
        conexao.end();

        if (erro) {
          console.error("Erro na query:", erro.sqlMessage);
          reject(erro);
          return;
        }

        console.log("Resultado da query:", resultados);
        resolve(resultados);
      });
    });

    conexao.on("error", (erro) => {
      console.error("ERRO NO MySQL SERVER: ", erro.sqlMessage);
    });
  });
}