const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = class autoModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof autoModel}
   */
  static setup(sequelizeInstance) {
    autoModel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      marca: {
        type: DataTypes.STRING,
      },
      modelo: {
        type: DataTypes.STRING,
      },
      año: {
        type: DataTypes.STRING,
      },
      kms: {
        type: DataTypes.INTEGER,
      },
      color: {
        type: DataTypes.STRING,
      },
      aire: {
        type: DataTypes.STRING,
      },
      pasajeros: {
        type: DataTypes.INTEGER,
      },
      manual: {
        type: DataTypes.INTEGER,
      },
      automatico: {
        type: DataTypes.INTEGER,
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
        modelName: 'auto',
        timestamps: false,
    }
);
    return autoModel;
  }
};
