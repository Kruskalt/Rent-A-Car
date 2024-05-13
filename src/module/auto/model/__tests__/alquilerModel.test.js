const Sequelize = require('sequelize');
const AutoModel = require('../autoModel');


const sequelizeInstance = new Sequelize('sqlite::memory');

test('Después de hacerle un setup al Auto Model y sincronizar el modelo, la tabla Auto existe', async () => {
  AutoModel.setup(sequelizeInstance);

  
  await AutoModel.sync({ force: true });
  expect(await AutoModel.findAll()).toEqual([]);
});
