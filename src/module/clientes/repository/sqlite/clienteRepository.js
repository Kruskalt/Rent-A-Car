const AbstractClienteRepository = require('../abstactClienteRepository.js');
const ClienteNotFoundError = require('../error/clienteNotFoundError.js');
const ClienteIdNotDefinedError = require('../error/clienteIdNotDefinedError.js');
const { fromDbToEntity,fromModelToEntity } = require('../../mapper/clienteMapper.js');
module.exports = class AutoRepository extends AbstractClienteRepository {
  /**
   * @param {typeof import('../../model/clienteModel.js')} clienteModel
   * *
   */
  constructor(clienteModel) {
    super();
    this.clienteModel = clienteModel;
    
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
   * @param {import('../../entity/cliente.js')} cliente
   * @returns {Promise<import('../../entity/cliente.js')>}
   */
  async save(cliente) {
    let clienteModel;

    const buildOptions = { isNewRecord: !cliente.id};
    clienteModel = this.clienteModel.build(cliente, buildOptions);
    
    clienteModel = await clienteModel.save();

    return fromModelToEntity(clienteModel);
  }

  /**
   * @param {import('../../entity/cliente.js')} cliente
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
  async delete(cliente) {
    if (!cliente || !cliente.id) {
      throw new ClienteIdNotDefinedError();
    }

    return Boolean(
      await this.clienteModel.destroy({ where: { id: cliente.id } })
    );
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/cliente.js')}
   */
  async getById(id) {
    const clienteModel = await this.clienteModel.findOne({
      where: { id },
    });

    if (!clienteModel) {
      throw new ClienteNotFoundError(`No se encontró el cliente con id ${id}`);
    }

    return fromModelToEntity(clienteModel);
  }

  /**
   * @return {Array<import('../../entity/cliente.js')>}
   */
  async getAll() {
    
    const clientes = await this.clienteModel.findAll();
    return clientes.map(fromModelToEntity);
    
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