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
    hasta,
    desde,
    fk_auto,
    dni_usuario,
    telefono,
    mail,
    
}) {

    return new Alquiler({
        hasta,
        desde,
        fk_auto,
        dni_usuario,
        telefono,
        mail
    });
}

module.exports = {
    fromDataToEntity,
    fromDbToEntity,
};