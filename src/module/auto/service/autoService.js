/**
 * @typedef {import('../repository/abstractAutoRepository')} AbstractAutoRepository
 */

const AutoNotDefinedError = require('./error/autoNotDefinedError.js');
const AutoIdNotDefinedError = require('./error/autoIdNotDefinedError.js');
const Auto = require('../entity/auto.js');
const Alquiler  = require('../entity/alquiler.js');

module.exports = class Service {
  /**
   *
   * @param {AbstractRepository} autoRepository
   */
  constructor(autoRepository) {
    this.autoRepository = autoRepository;
  }

  /**
   * @param {Auto} auto
   */
  async save(auto) {
    if (auto === undefined) {
      throw new AutoNotDefinedError();
    }

    return this.autoRepository.save(auto);
  }
  /**
   * @param {Alquiler} alquiler
   */
  async rent(alquiler) {
    

    return this.autoRepository.rent(alquiler);
  }


  /**
   * @param {auto} auto
   */
  async delete(auto) {
    if (!(auto instanceof Auto)) {
      throw new AutoNotDefinedError();
    }

    return this.autoRepository.delete(auto);
  }

  async getById(id) {
    if (id === undefined) {
      throw new AutoIdNotDefinedError();
    }

    return this.autoRepository.getById(id);
  }

  async getAll() {
    return this.autoRepository.getAll();
  }
};