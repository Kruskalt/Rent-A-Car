const { Sequelize, Model, DataTypes } = require("sequelize");
module.exports = class alquilerModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof alquilerModel}
   */
  static setup(sequelizeInstance) {
    alquilerModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        precioUnitario: {
          type: DataTypes.INTEGER,
        },
        desde: {
          type: DataTypes.DATE,
        },
        hasta: {
          type: DataTypes.DATE,
        },
        precioTotal: {
          type: DataTypes.INTEGER,
        },
        medioDePago: {
          type: DataTypes.STRING,
        },
        pagado: {
          type: DataTypes.BOOLEAN,
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
        modelName: "alquiler",
        timestamps: false,
      }
    );
    return alquilerModel;
  }
  
  /**
   *
   * @param {import('../../clientes/model/clienteModel')} ClienteModel
   * @param {import("../../auto/model/autoModel")} AutoModel
   */
  static setupAssociations(ClienteModel, AutoModel) {
    alquilerModel.belongsTo(ClienteModel, { foreignKey: "cliente_id" });
    alquilerModel.belongsTo(AutoModel, { foreignKey: "auto_id" });
  }
};
