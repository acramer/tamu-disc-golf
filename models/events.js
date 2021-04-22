'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  events.init({
    event_title: DataTypes.TEXT,
    event_date: DataTypes.DATE,
    event_place: DataTypes.TEXT,
    event_description: DataTypes.TEXT,
    image_path: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};