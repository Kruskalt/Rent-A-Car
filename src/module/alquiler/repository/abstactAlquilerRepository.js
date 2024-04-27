/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
const AbstractAlquilerRepositoryError = require("./error/abstractAlquilerRepositoryError");
const MethodNotImplementedError = require("./error/methodNotImplementedError");

module.exports = class AbstractAlquilerRepository {
  constructor() {
    if (new.target === AbstractAlquilerRepository) {
      throw new AbstractAlquilerRepositoryError(
        'No se puede instanciar el repositorio de autos abstracto.'
      );
    }
  }

  /**
   * @param {import('../entity/alquiler')} alquiler
   * @returns {import('../entity/alquiler')}
   */
  async save(alquiler) {
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
   * @returns {import('../entity/alquiler')}
   */
  async getById(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @returns {Array<import('../entity/alquiler')>}
   */
  async getAll() {
    
  }
};