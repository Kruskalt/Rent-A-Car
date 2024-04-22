const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = class clienteModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof clienteModel}
   */
  static setup(sequelizeInstance) {
    clienteModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        nombre: {
          type: DataTypes.STRING,
        },
        apellido: {
          type: DataTypes.STRING,
        },
        tipoDni: {
          type: DataTypes.STRING,
        },
        nroDni: {
          type: DataTypes.INTEGER,
        },
        direccion: {
          type: DataTypes.STRING,
        },
        telefono: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        nacimiento: {
          type: DataTypes.DATE,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "cliente",
        timestamps: false,
      }
    );
    return clienteModel;
  }
};
