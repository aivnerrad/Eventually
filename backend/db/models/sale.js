'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    hostId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    neighborhoodId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    imageUrl: DataTypes.STRING
  }, {});
  Sale.associate = function(models) {
    // associations can be defined here
  };
  return Sale;
};
