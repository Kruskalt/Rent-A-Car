const ClienteController = require('./controller/clienteController');
const ClienteRepository = require('./repository/sqlite/clienteRepository');
const ClienteService = require('./service/clienteService');
const ClienteModel = require ( "./model/clienteModel")

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {ClienteController} controller;
   */
  const controller = container.get('ClienteController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  ClienteController,
  ClienteService,
  ClienteRepository,
  ClienteModel,
};