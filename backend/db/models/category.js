'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany( models.Sale, { foreignKey: 'categoryId' })
  };
  return Category;
};
