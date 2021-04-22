'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class officers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  officers.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    about: DataTypes.STRING,
    position: DataTypes.STRING,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'officers',
  });
  return officers;
};