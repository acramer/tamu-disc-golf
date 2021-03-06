'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  teams.init({
    team_name: DataTypes.STRING,
    member_name1: DataTypes.STRING,
    member_name2: DataTypes.STRING,
    member_name3: DataTypes.STRING,
    member_name4: DataTypes.STRING,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teams',
  });
  return teams;
};