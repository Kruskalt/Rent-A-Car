const Sequelize = require('sequelize');
const AlquilerModel = require('../alquilerModel');
const AutoModel = require('../../../auto/model/autoModel');
const ClienteModel = require('../../../clientes/model/clienteModel');

const sequelizeInstance = new Sequelize('sqlite::memory');

test('Después de hacerle un setup al Alquiler Model y sincronizar el modelo, la tabla Alquiler existe', async () => {
  AlquilerModel.setup(sequelizeInstance);
  AutoModel.setup(sequelizeInstance);
  ClienteModel.setup(sequelizeInstance)
  AlquilerModel.setupAssociations(AutoModel, ClienteModel);
  await AlquilerModel.sync({ force: true });
  expect(await AlquilerModel.findAll()).toEqual([]);
});
