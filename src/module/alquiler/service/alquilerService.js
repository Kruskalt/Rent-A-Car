/**
 * @typedef {import('../repository/abstractAlquilerRepository')} AbstractAlquilerRepository
 */

const AlquilerNotDefinedError = require("./error/alquilerNotDefinedError.js");
const AlquilerIdNotDefinedError = require("./error/alquilerIdNotDefinedError.js");
const Alquiler = require("../entity/alquiler.js");

module.exports = class Service {
  /**
   *
   * @param {AbstractRepository} alquilerRepository
   */
  constructor(alquilerRepository) {
    this.alquilerRepository = alquilerRepository;
  }

  /**
   * @param {Alquiler} alquiler
   */
  async save(alquiler) {
    if (alquiler === undefined) {
      throw new AlquilerNotDefinedError();
    }

    return this.alquilerRepository.save(alquiler);
  }

  /**
   * @param {Alquiler} alquiler
   */
  async rent(alquiler) {
    return this.alquilerRepository.rent(alquiler);
  }

  /**
   * @param {Alquiler} alquiler
   */
  async delete(alquiler) {
    if (!(alquiler instanceof Alquiler)) {
      throw new AlquilerNotDefinedError();
    }

    return this.alquilerRepository.delete(alquiler);
  }

  async getById(id) {
    if (id === undefined) {
      throw new AlquilerIdNotDefinedError();
    }

    return this.alquilerRepository.getById(id);
  }

  async getAll() {
    return this.alquilerRepository.getAll();
  }

  async getAllRentById(id) {
    return this.alquilerRepository.getAllRentById(id);
  }
};
