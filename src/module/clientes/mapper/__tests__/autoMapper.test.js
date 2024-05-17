const { fromModelToEntity } = require('../clienteMapper');
const AutoEntity = require('../../entity/cliente');

test('Convierte un modelo a una entidad del dominio', () => {
  expect(
    fromModelToEntity({
      toJSON() {
        return {};
      },
    })
  ).toBeInstanceOf(AutoEntity);
});
