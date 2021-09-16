'use strict';
module.exports = (sequelize, DataTypes) => {
  const Neighborhood = sequelize.define('Neighborhood', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Neighborhood.associate = function(models) {
    // associations can be defined here
  };

  return Neighborhood;
};
