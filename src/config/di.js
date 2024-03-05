// configure DI container
const path = require('path');
const { default: DIContainer, object, get, factory } = require('rsdi');
const multer = require('multer');
const Sqlite3Database = require('better-sqlite3');

const session = require('express-session');
const { AutoController, AutoService, AutoRepository } = require('../module/auto/module.js');

function configureMainDatabaseAdapter() {
    

  return new Sqlite3Database("./s.db", {
    verbose: console.log,
  });
}

function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sessionOptions = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.CRESTS_UPLOAD_DIR);
    },
    filename(req, file, cb) {
      // https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer
      // al tener una extensión, el navegador lo sirve en vez de descargarlo
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  return multer({ storage });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
    Session: factory(configureSession),
    Multer: factory(configureMulter),
  });
}

/**
 * @param {DIContainer} container
 */
function addAutoModuleDefinitions(container) {
  container.addDefinitions({
    AutoController: object(AutoController).construct(get('Multer'), get('AutoService')),
    AutoService: object(AutoService).construct(get('AutoRepository')),
    AutoRepository: object(AutoRepository).construct(get('MainDatabaseAdapter')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addAutoModuleDefinitions(container);
  return container;
};