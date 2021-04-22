'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gallery_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  gallery_images.init({
    image_path: DataTypes.STRING,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'gallery_images',
  });
  return gallery_images;
};