const Auto = require('../entity/auto');

/**
 *
 * @param {Object} formData
 * @returns Auto
 */
function fromDataToEntity({
  id,
    marca ,
    modelo ,
    año ,
    kms ,
    color ,
    aire ,
    pasajeros ,
    manual ,
    automatico 
}) {
  return new Auto({
    id,
    marca ,
    modelo ,
    año ,
    kms ,
    color ,
    aire ,
    pasajeros ,
    manual ,
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
    marca ,
    modelo ,
    año ,
    kms ,
    color ,
    aire ,
    pasajeros ,
    man:manual ,
    automatico 
}) {
  console.log("mapper",id)
  return new Auto({
    id,
    marca ,
    modelo ,
    año ,
    kms ,
    color ,
    aire ,
    pasajeros ,
    manual ,
    automatico 
  });
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};