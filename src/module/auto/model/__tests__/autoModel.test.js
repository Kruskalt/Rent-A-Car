const Sequelize = require('sequelize');
const ClienteModel = require('../autoModel');


const sequelizeInstance = new Sequelize('sqlite::memory');

test('Después de hacerle un setup al Auto Model y sincronizar el modelo, la tabla Auto existe', async () => {
  ClienteModel.setup(sequelizeInstance);

  
  await ClienteModel.sync({ force: true });
  expect(await ClienteModel.findAll()).toEqual([]);
});
