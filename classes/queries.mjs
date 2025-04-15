import { Database } from "#class/database.mjs"
import { STATUSRESPONSE } from "#config/index.mjs";

class Queries extends Database {

  #params = [];
  #query = '';

  constructor() {
    super();
  }

  async getRoles({ user }) {
    try {
      this.connect();
      this.#query = this.getQuery('getUserIdEstatus');
      this.#params = [ user ];
      const { rows } = await this.client.execute({
        sql: this.#query,
        args: [ ...this.#params ]
      });

      if (!rows.length) {
        return { status: STATUSRESPONSE.NOTEXIST, data: { estatus: 0 } }
      }
      const [ data ] = rows;
      const { id_usuario, estatus } = data;

      if (!estatus && !id_usuario) {
        return { status: STATUSRESPONSE.NOTACTIVE, data: { estatus: 2 } }
      }
      
      this.#query = this.getQuery('getRolesByUser');
      this.#params = [ id_usuario ];
      const { rows: roles } = await this.client.execute({
        sql: this.#query,
        args: [ ...this.#params ]
      });

      return { status: STATUSRESPONSE.SUCCESS, data: { roles, estatus: 1 } }
    } catch(e) {
      this.catch(this.getRoles.name, e, this.#query, this.#params);
    } finally {
      this.disconnect();
      this.finally(this.getRoles.name);
    }
  }

}

export {
  Queries
}