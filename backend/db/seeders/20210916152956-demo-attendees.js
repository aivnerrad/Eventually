'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Attendees', [{
     userId: 1,
     saleId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
    userId: 1,
    saleId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 1,
    saleId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    saleId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 3,
    saleId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 3,
    saleId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 4,
    saleId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 4,
    saleId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 4,
    saleId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 4,
    saleId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Attendees', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
