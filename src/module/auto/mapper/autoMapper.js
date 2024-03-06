const Auto = require('../entity/auto');

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
  automatico
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
    automatico
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
  automatico
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
    automatico
  });
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};