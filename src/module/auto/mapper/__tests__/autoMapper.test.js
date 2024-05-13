const { fromModelToEntity } = require('../autoMapper');
const AutoEntity = require('../../entity/auto');

test('Convierte un modelo a una entidad del dominio', () => {
  expect(
    fromModelToEntity({
      toJSON() {
        return {};
      },
    })
  ).toBeInstanceOf(AutoEntity);
});
