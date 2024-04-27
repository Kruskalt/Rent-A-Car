const Alquiler = require("../entity/alquiler");
/**
 * @param {import('./../model/alquilerModel')} model
 * @returns {import('../../alquiler/entity/alquiler')}
 */
function fromModelToEntity(model) {
  return new Alquiler(model.toJSON());
}
/**
 *
 * @param {Object} formData
 * @returns Alquiler
 */
function fromDataToEntity({
  id,
  auto,
  cliente,
  precioUnitario,
  desde,
  hasta,
  precioTotal,
  medioDePago,
  pagado,
}) {
  return new Alquiler({
    id,
    auto,
    cliente,
    precioUnitario,
    desde,
    hasta,
    precioTotal,
    medioDePago,
    pagado,
  });
}

module.exports = {
  fromDataToEntity,
  fromModelToEntity,
};
