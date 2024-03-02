const AbstractAutoRepository = require('../abstactAutoRepository.js');
const AutoNotFoundError = require('../error/autoNotFoundError.js');
const autoIdNotDefinedError = require('../error/autoIdNotDefinedError.js');
const { fromDbToEntity } = require('../../mapper/autoMapper.js');

module.exports = class AutoRepository extends AbstractAutoRepository {
  /**
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    super();
    this.databaseAdapter = databaseAdapter;
  }

  /**
   * @param {import('../../entity/auto')} auto
   * @returns {import('../../entity/auto')}
   */
  save(auto) {
    let id;
    const isUpdate = auto.id;
    if (isUpdate) {
      id = auto.id;
      const statement = this.databaseAdapter.prepare(`
        UPDATE autos SET
          
          marca = ?,
          modelo = ?,
          año = ?,
          kms = ?,
          color = ?,
          aire = ?,
          pasajeros = ?,
          man = ?,
          automatico = ?
        WHERE id = ?
      `);

      const params = [
        auto.marca,
        auto.modelo,
        auto.año,
        auto.kms,
        auto.color,
        auto.aire,
        auto.pasajeros,
        auto.manual,
        auto.automatico,
        auto.id,
      ];

    //   if (club.crestUrl) {
    //     params.unshift(club.crestUrl);
    //   }

      statement.run(params);
    } else {
      const statement = this.databaseAdapter.prepare(`
        INSERT INTO autos(
            marca ,
            modelo ,
            año ,
            kms ,
            color ,
            aire ,
            pasajeros ,
            man ,
            automatico 
        ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = statement.run(
        auto.marca,
        auto.modelo,
        auto.año,
        auto.kms,
        auto.color,
        auto.aire,
        auto.pasajeros,
        auto.manual,
        auto.automatico
      );
      
      id = result.lastInsertRowid;
      console.log("soy el id",id);
    }

    return this.getById(id);
  }

  /**
   * @param {import('../../entity/auto.js')} auto
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
  delete(auto) {
    if (!auto || !auto.id) {
      throw new autoIdNotDefinedError('El ID del auto no está definido');
    }

    this.databaseAdapter.prepare('DELETE FROM autos WHERE id = ?').run(auto.id);

    return true;
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/auto')}
   */
  getById(id) {
    const auto = this.databaseAdapter
      .prepare(
        `SELECT
        id,
        marca ,
        modelo ,
        año ,
        kms ,
        color ,
        aire ,
        pasajeros ,
        man,
        automatico 
          FROM autos WHERE id = ?`
      )
      .get(id);
      
      console.log("soy el auto",id,auto)

    if (auto === undefined) {
      throw new AutoNotFoundError(`No se encontró el auto con ID: ${id}`);
    }

    return fromDbToEntity(auto);
  }

  /**
   * @return {Array<import('../../entity/auto.js')>}
   */
  getAll() {
    const autos = this.databaseAdapter
      .prepare(
        `SELECT
        id,
        marca ,
        modelo ,
        año ,
        kms ,
        color ,
        aire ,
        pasajeros ,
        man,
        automatico 
        FROM autos`
      )
      .all();
    return autos.map((autoData) => fromDbToEntity(autoData));
  }
};