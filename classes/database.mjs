import { createClient } from "@libsql/client";
import { DB_URL, DB_TOKEN } from "#config/index.mjs";
import { USUARIOS, TABLES, ROLESUSUARIOS } from "#db/index.mjs";
import { Log } from "#class/log.mjs";


class Database extends Log {
  client = null;

  #queries = {
    getRolesByUser: `SELECT ${ROLESUSUARIOS.IDROL} FROM ${TABLES.roles_usuarios} WHERE ${ROLESUSUARIOS.IDUSUARIO} = ? AND ${ROLESUSUARIOS.ESTATUS} = 1`,
    getUserIdEstatus: `SELECT ${USUARIOS.ESTATUS}, ${USUARIOS.IDUSUARIO} FROM ${TABLES.usuarios} WHERE ${USUARIOS.USER} = ?`
  };

  constructor() {
    super();
  }

  connect() {
    this.client = createClient({
      url: `${DB_URL}`,
      authToken: `${DB_TOKEN}`
    });
  }

  disconnect() {
    this.client.close();
  }

  catch(origin, e, query = '', params = '') {
    this.error(`Opps! we got an error: ${origin}(${query}, [${params}]): ${e.message}`);
    throw new Error(`Opps! we got an error: ${origin}(${query}, ${params}): ${e.message}`);
  }

  finally(origin) {
    this.info(`Proceso Terminado: ${origin}`);
  }

  getQuery(query) {
    if (!(query in this.#queries)) {
      throw new Error(`Opps! this query: ${query} not exists!`);
    }
    return this.#queries[query];
  }
}

export {
  Database
}