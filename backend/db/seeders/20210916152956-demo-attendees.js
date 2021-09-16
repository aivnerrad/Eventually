'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Attendees', [{
     userId: 1,
     saleId: 5,
     createdAt: new Date(),
     updatedAt: new Date(),
   }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Attendees', null, {});
  }
};
