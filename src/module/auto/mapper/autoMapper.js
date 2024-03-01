const Auto = require('../entity/auto');

/**
 *
 * @param {Object} formData
 * @returns Auto
 */
function fromDataToEntity({
  id,
  name,
  'short-name': shortName,
  tla,
  'crest-url': crestUrl,
  address,
  phone,
  website,
  email,
  founded,
  'club-colors': clubColors,
  venue,
}) {
  return new Club({
    id,
    name,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
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