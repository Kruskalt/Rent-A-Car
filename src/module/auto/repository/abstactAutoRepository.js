/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
const AbstractClubRepositoryError = require("./error/abstractClubRepositoryError");
const MethodNotImplementedError = require("./error/methodNotImplementedError");

module.exports = class AbstractClubRepository {
  constructor() {
    if (new.target === AbstractClubRepository) {
      throw new AbstractClubRepositoryError(
        'No se puede instanciar el repositorio de autos abstracto.'
      );
    }
  }

  /**
   * @param {import('../entity/auto')} auto
   * @returns {import('../entity/auto')}
   */
  async save(auto) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   */
  async delete(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   * @returns {import('../entity/auto')}
   */
  async getById(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @returns {Array<import('../entity/auto')>}
   */
  async getAll() {
    
  }
};