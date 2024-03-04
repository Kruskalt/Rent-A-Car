/**
 * @typedef {import('../repository/abstractAutoRepository')} AbstractAutoRepository
 */

const AutoNotDefinedError = require('./error/autoNotDefinedError.js');
const AutoIdNotDefinedError = require('./error/autoIdNotDefinedError.js');
const Auto = require('../entity/auto.js');

module.exports = class Service {
  /**
   *
   * @param {AbstractAbstractRepository} autoRepository
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