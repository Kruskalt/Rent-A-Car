const AbstractAlquilerRepository = require("../abstactAlquilerRepository.js");
const AlquilerNotFoundError = require("../error/alquilerNotFoundError.js");
const alquilerIdNotDefinedError = require("../error/alquilerIdNotDefinedError.js");
const { fromModelToEntity } = require("../../mapper/alquilerMapper.js");
const alquilerMapper = require("../../mapper/alquilerMapper.js");

module.exports = class AutoRepository extends AbstractAlquilerRepository {
  /**
   * @param {typeof import('../../model/alquilerModel.js')} alquilerModel
   * *@param {typeof import('../../../auto/model/autoModel.js')} autoModel
   * @param {typeof import('../../../clientes/model/clienteModel.js')} clienteModel
   */
  constructor(alquilerModel, autoModel, clienteModel) {
    super();
    this.alquilerModel = alquilerModel;
    this.autoModel = autoModel;
    this.clienteModel = clienteModel;
  }

  /**
   * @param {import('../../entity/alquiler.js')} alquiler
   * @returns {Promise<import('../../entity/alquiler.js')>}
   */
  async save(alquiler) {
    let alquilerModel;

    const buildOptions = {
      isNewRecord: !alquiler.id,
      include: [this.autoModel, this.clienteModel],
    };
    alquilerModel = this.alquilerModel.build(alquiler, buildOptions);    
    alquilerModel.setDataValue("cliente_id", alquiler.cliente.id);
    alquilerModel.setDataValue("auto_id", alquiler.auto.id);
    alquilerModel.cliente.isNewRecord = false;
    alquilerModel.auto.isNewRecord = false;    
    alquilerModel = await alquilerModel.save();
    return fromModelToEntity(alquilerModel);
  }

  /**
   * @param {import('../../entity/alquiler.js')} alquiler
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
  async delete(alquiler) {
    if (!alquiler || !alquiler.id) {
      throw new alquilerIdNotDefinedError();
    }
    const deleteResult = Boolean(
      await this.alquilerModel.destroy({ where: { id: alquiler.id } })
    );

    return deleteResult;
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/alquiler.js')}
   */
  async getById(id) {
    const alquilerModel = await this.alquilerModel.findOne({
      where: { id },
    });

    if (alquilerModel == null) {
      throw new AlquilerNotFoundError(`No se encontró alquiler con id ${id}`);
    }

    return fromModelToEntity(alquilerModel);
  }

  /**
   * @return {Array<import('../../entity/alquiler.js')>}
   */
  async getAll() {
    const alquiler = await this.alquilerModel.findAll();
    
    return alquiler.map(fromModelToEntity);
  }
  // getAllRentById(id) {

  //   const alquileres = this.databaseAdapter
  //     .prepare(
  //       `SELECT
  //       id,
  //       hasta ,
  //        desde,
  //       fk_auto ,
  //       dni_usuario ,
  //       telefono ,
  //       mail

  //       FROM alquilado WHERE fk_auto= ${id}`
  //     )
  //     .all();
  //   return alquileres.map((alquilerData) => alquilerMapper.fromDbToEntity(alquilerData));
  // }
};
