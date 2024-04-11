const AutoController = require('./controller/autoController');
const AutoRepository = require('./repository/sqlite/autoRepository');
const AutoService = require('./service/autoService');
const AutoModel = require ( "./model/autoModel")

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {AutoController} controller;
   */
  const controller = container.get('AutoController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  AutoController,
  AutoService,
  AutoRepository,
  AutoModel,
};