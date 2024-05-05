const Alquiler = require("../entity/alquiler");
const Auto = require("../../auto/entity/auto");
const Cliente = require("../../clientes/entity/cliente");
/**
 * @param {import('./../model/alquilerModel')} model
 * @returns {import('../../alquiler/entity/alquiler')}
 */
// Función para convertir el modelo de auto a entidad de auto


// Función para convertir el modelo de alquiler a entidad de alquiler
function fromModelToEntity(model) {
  const auto = new Auto({id: model.auto_id}); // Convierte el modelo de auto a entidad de auto
  const cliente = new Cliente({id: model.cliente_id}) // Convierte el modelo de cliente a entidad de cliente
  return new Alquiler({
    ...model.toJSON(),
    auto,
    cliente,
  }); // Combina los datos y crea la entidad de alquiler
}
/**
 *
 * @param {Object} formData
 * @returns Alquiler
 */
function fromDataToEntity({
  id,
  auto_id,
  cliente_id,
  precioUnitario,
  desde,
  hasta,
  precioTotal,
  medioDePago,
  pagado,
}) {
  return new Alquiler({
    id,
    auto: new Auto({id : Number (auto_id)}),
    cliente : new Cliente({id : Number (cliente_id)}),
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
