require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDependencyInjection = require('./config/di.js');
const { init: initAutoModule } = require('./module/auto/module');
const { init: initClienteModule } = require('./module/clientes/module.js');
const { init: initAlquilerModule } = require('./module/alquiler/module.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// https://mozilla.github.io/nunjucks/getting-started.html#when-using-node
nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const container = configureDependencyInjection(app);
app.use(container.get('Session'));

initAutoModule(app, container);
initClienteModule(app, container);
initAlquilerModule(app, container);
console.log("la db es ", process.env.DB_PATH)
/**
 * @type {import('./module/auto/controller/autoController')} controller;
 */
const autoController = container.get('AutoController');
app.get('/', autoController.index.bind(autoController));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));