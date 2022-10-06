const Sequelize = require('sequelize');

module.exports = class Device extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      deviceModelName: {
        type: Sequelize.STRING(100),
      },
      manufacturer: {
        type: Sequelize.STRING(100),
      },
      location: {
        type: Sequelize.STRING(255),
      },
      edgeSerialNumber: {
        type: Sequelize.STRING(20),
      },
      networkInterface: {
        type: Sequelize.STRING(10),
      },
      networkConfig: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }
};
