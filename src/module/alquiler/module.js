const AlquilerController = require("./controller/alquilerController");
const AlquilerRepository = require("./repository/sqlite/alquilerRepository");
const AlquilerService = require("./service/alquilerService");
const AlquilerModel = require("./model/alquilerModel");

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {AlquilerController} controller;
   */
  const controller = container.get("AlquilerController");
  controller.configureRoutes(app);
}

module.exports = {
  init,
  AlquilerController,
  AlquilerService,
  AlquilerRepository,
  AlquilerModel,
};
