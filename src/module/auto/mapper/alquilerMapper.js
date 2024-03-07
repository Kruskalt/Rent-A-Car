const Alquiler = require('../entity/alquiler');

/**
 *
 * @param {Object} formData
 * @returns Alquiler
 */
function fromDataToEntity({
    hasta,
    desde,
    id,
    dni,
    telefono,
    mail

}) {
    console.log("mapper",id)
    console.log(dni)

    return new Alquiler({
        hasta,
        desde,
        fk_auto:id,
        dni_usuario: dni,
        telefono,
        mail
    });
}

/**
 *
 * @param {Object} formData
 * @returns Alquiler
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