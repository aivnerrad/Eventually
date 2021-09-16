'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendee = sequelize.define('Attendee', {
    userId: DataTypes.INTEGER,
    saleId: DataTypes.INTEGER
  }, {});
  Attendee.associate = function(models) {
    // associations can be defined here
  };
  return Attendee;
};
