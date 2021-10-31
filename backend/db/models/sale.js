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
    const attendeesColumnMapping = {
      through: 'Attendee',
      foreignKey: 'saleId',
      otherKey: 'userId',
      as: 'attendee'
    }
    Sale.hasMany( models.Attendee, { foreignKey: 'saleId' })
    Sale.belongsToMany( models.User, attendeesColumnMapping)

  };
  return Sale;
};
