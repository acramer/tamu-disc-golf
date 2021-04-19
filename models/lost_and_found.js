'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lost_and_founds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  lost_and_founds.init({
    details: DataTypes.TEXT,
    title: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lost_and_founds',
  });
  return lost_and_founds;
};