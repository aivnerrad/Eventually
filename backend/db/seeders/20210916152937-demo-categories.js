'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Categories', [{
     name: "yard sale",
     imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
     createdAt: new Date(),
     updatedAt: new Date(),
   }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Categories', null, {});
  }
};
