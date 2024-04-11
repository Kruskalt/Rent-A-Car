const AbstractAutoRepository = require('../abstactAutoRepository.js');
const AutoNotFoundError = require('../error/autoNotFoundError.js');
const autoIdNotDefinedError = require('../error/autoIdNotDefinedError.js');
const { fromDbToEntity,fromModelToEntity } = require('../../mapper/autoMapper.js');
const alquilerMapper = require('../../mapper/alquilerMapper.js');
module.exports = class AutoRepository extends AbstractAutoRepository {
  /**
   * @param {typeof import('../../model/autoModel.js')} clubModel
   * *
   */
  constructor(autoModel) {
    super();
    this.autoModel = autoModel;
    
  }
  // /**
  //  * @param {import('../../entity/alquiler.js')} alquiler
  //  * @returns {import('../../entity/alquiler.js')} 
  //  */
  // rent(alquiler) {
    
  //     const statement = this.databaseAdapter.prepare(`
  //       INSERT INTO alquilado(
  //           hasta,
  //           desde ,
  //           fk_auto ,
  //           dni_usuario ,
  //           telefono ,
  //           mail 
           
          
  //       ) VALUES(?, ?, ?, ?, ?, ?)
  //     `);

  //     const result = statement.run(
  //       alquiler.hasta,
  //       alquiler.desde,
  //       alquiler.fkAuto,
  //       alquiler.dniUsuario,
  //       alquiler.telefono,
  //       alquiler.mail,
  //     );
  //     return alquiler;
  //   }

   
  


  /**
   * @param {import('../../entity/auto.js')} auto
   * @returns {Promise<import('../../entity/auto.js')>}
   */
  async save(auto) {
    let autoModel;

    const buildOptions = { isNewRecord: !auto.id, include: this.areaModel };
    autoModel = this.autoModel.build(auto, buildOptions);
    
    autoModel = await autoModel.save();

    return fromModelToEntity(autoModel);
  }

  /**
   * @param {import('../../entity/auto.js')} auto
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
  async delete(auto) {
    if (!auto || !auto.id) {
      throw new autoIdNotDefinedError();
    }

    return Boolean(await this.autoModel.destroy({ where: { id: auto.id } }));
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/auto.js')}
   */
  async getById(id) {
    const autoModel = await this.autoModel.findOne({
      where: { id },
    });

    if (!autoModel) {
      throw new autoIdNotDefinedError(`No se encontró auto con id ${id}`);
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