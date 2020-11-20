'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  courses.init({
    name: DataTypes.STRING,
    place_id: DataTypes.STRING,
    address: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'courses',
  });
  return courses;
};