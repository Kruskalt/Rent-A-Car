const Auto = require('../entity/auto');



/**
 * @param {import('./../model/autoModel')} model
 * @returns {import('../../auto/entity/auto')}
 */
function fromModelToEntity(model) {
  return new Auto(model.toJSON());
}
/**
 *
 * @param {Object} formData
 * @returns Auto
 */
function fromDataToEntity({
  id,
  marca,
  modelo,
  año,
  kms,
  color,
  aire,
  pasajeros,
  manual,
  automatico,
  precio,
}) {
  if (manual === "si") {
    manual = 1
  } else {
    manual = 0
  }
  if (automatico === "si") {
    automatico = 1
  } else {
    automatico = 0
  }
  return new Auto({
    id,
    marca,
    modelo,
    año,
    kms,
    color,
    aire,
    pasajeros,
    manual,
    automatico,
    precio
  });
}

/**
 *
 * @param {Object} formData
 * @returns Auto
 */
function fromDbToEntity({
  id,
  marca,
  modelo,
  año,
  kms,
  color,
  aire,
  pasajeros,
  man: manual,
  automatico,
  precio
}) {

  return new Auto({
    id,
    marca,
    modelo,
    año,
    kms,
    color,
    aire,
    pasajeros,
    manual,
    automatico,
    precio
  });
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
  fromModelToEntity
};