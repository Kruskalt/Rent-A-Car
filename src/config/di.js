// configure DI container
const path = require('path');
const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const multer = require('multer');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {
  AutoController,
  AutoService,
  AutoRepository,
  AutoModel,
} = require("../module/auto/module");


function configureMainSequelizeDatabase() {
  console.log("la db es ",process.env.DB_PATH )
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data/database.db',
  });
  return sequelize;
}

function configureSessionSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data/session.db',
  });
  return sequelize;
}

/**
 * @param {DIContainer} container
 */
function configureClubModel(container) {
  AutoModel.setup(container.get('Sequelize'));
  
  return AutoModel;
}

/**
 * @param {DIContainer} container
 */


/**
 * @param {DIContainer} container
 */
function configureSession(container) { //configurar la sesion
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sequelize = container.get('SessionSequelize');
  const sessionOptions = {
    store: new SequelizeStore({ db: sequelize }),
    secret: 'ke', //key de la aplicacion
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS }, //cuanto dura un cookie, cada una semana tener que volverse a loggear
  };
  return session(sessionOptions);
}

function configureMulter() { //para que se suban con la extension adecuada
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.CRESTS_UPLOAD_DIR);// va al archivo .env
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
    Sequelize: factory(configureMainSequelizeDatabase),
    SessionSequelize: factory(configureSessionSequelizeDatabase),
    Session: factory(configureSession),
    Multer: factory(configureMulter), //subir cosas al servidor 
  });
}

/**
 * @param {DIContainer} container
 */
function addClubModuleDefinitions(container) {
  container.addDefinitions({
    AutoController: object(AutoController).construct(
      get('Multer'),
      get('AutoService'),
      
    ),
    AutoService: object(AutoService).construct(get('AutoRepository')),
    AutoRepository: object(AutoRepository).construct(get("AutoModel")),
    AutoModel: factory(configureClubModel),
  });
}

/**
 * @param {DIContainer} container
 */

module.exports = function configureDI() {//exporta la funcion que configura el di
  const container = new DIContainer();
  addCommonDefinitions(container); //pasamos el contenedor para agregarle las definiciones
  addClubModuleDefinitions(container);
  return container; //contiene todas las dependencias necesarias.
};
