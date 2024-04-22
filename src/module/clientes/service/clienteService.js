/**
 * @typedef {import('../repository/abstractClienteRepository')} AbstractClienteRepository
 */

const ClienteNotDefinedError = require("./error/clienteNotDefinedError");
const ClienteIdNotDefinedError = require("./error/clienteIdNotDefinedError");
const Cliente = require("../entity/cliente");

module.exports = class Service {
  /**
   *
   * @param {AbstractRepository} clienteRepository
   */
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  /**
   * @param {Cliente} cliente
   */
  async save(cliente) {
    if (cliente === undefined) {
      throw new ClienteNotDefinedError();
    }

    return this.clienteRepository.save(cliente);
  }

  /**
   * @param {Cliente} cliente
   */
  async delete(cliente) {
    if (!(cliente instanceof Cliente)) {
      throw new ClienteNotDefinedError();
    }

    return this.clienteRepository.delete(cliente);
  }

  async getById(id) {
    if (id === undefined) {
      throw new ClienteIdNotDefinedError();
    }

    return this.clienteRepository.getById(id);
  }

  async getAll() {
    return this.clienteRepository.getAll();
  }
};
