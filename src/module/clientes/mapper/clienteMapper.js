const Cliente = require('../entity/cliente');



/**
 * @param {import('../model/clienteModel')} model
 * @returns {import('../entity/cliente')}
 */
function fromModelToEntity(model) {
  return new Cliente(model.toJSON());
}
/**
 *
 * @param {Object} formData
 * @returns Cliente
 */
function fromDataToEntity({
  id,
  nombre,
    apellido,
    'tipo-dni':tipoDni,
    'nro-dni':nroDni,
    direccion,
    telefono,
    email,
    nacimiento,
}) {
  
  return new Cliente({
    id,
    nombre,
      apellido,
      tipoDni,
      nroDni,
      direccion,
      telefono,
      email,
      nacimiento,
  });
}

/**
 *
 * @param {Object} formData
 * @returns Auto
 */
function fromDbToEntity({
  id,
  nombre,
    apellido,
    tipoDni,
    nroDni,
    direccion,
    telefono,
    email,
    nacimiento,
}) {

  return new Cliente({
    id,
    nombre,
      apellido,
      tipoDni,
      nroDni,
      direccion,
      telefono,
      email,
      nacimiento,
  });
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
  fromModelToEntity
};