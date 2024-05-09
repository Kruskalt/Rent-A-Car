const { fromModelToEntity } = require('../alquilerMapper');
const AlquilerEntity = require('../../entity/alquiler');

test('Convierte un modelo a una entidad del dominio', () => {
  expect(
    fromModelToEntity({
      toJSON() {
        return {};
      },
    })
  ).toBeInstanceOf(AlquilerEntity);
});
