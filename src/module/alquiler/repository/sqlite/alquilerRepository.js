const AbstractAutoRepository = require("../abstactAutoRepository.js");
const AutoNotFoundError = require("../error/autoNotFoundError.js");
const autoIdNotDefinedError = require("../error/autoIdNotDefinedError.js");
const { fromModelToEntity } = require("../../mapper/autoMapper.js");
const alquilerMapper = require("../../mapper/alquilerMapper.js");

module.exports = class AutoRepository extends AbstractAutoRepository {
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
    alquilerModel = await alquilerModel.save();

    return fromModelToEntity(alquilerModel);
  }

  /**
   * @param {import('../../entity/auto.js')} auto
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
  async delete(auto) {
    if (!auto || !auto.id) {
      throw new autoIdNotDefinedError();
    }
    const deleteResult = Boolean(
      await this.autoModel.destroy({ where: { id: auto.id } })
    );

    return deleteResult;
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/auto.js')}
   */
  async getById(id) {
    const autoModel = await this.autoModel.findOne({
      where: { id },
    });

    if (autoModel == null) {
      throw new AutoNotFoundError(`No se encontró auto con id ${id}`);
    }

    return fromModelToEntity(autoModel);
  }

  /**
   * @return {Array<import('../../entity/auto.js')>}
   */
  async getAll() {
    const autos = await this.autoModel.findAll();
    return autos.map(fromModelToEntity);
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
