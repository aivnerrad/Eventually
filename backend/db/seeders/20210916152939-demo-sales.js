'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Sales', [{
    hostId: 1,
    categoryId: 2,
    neighborhoodId: 2,
    title: "test-title",
    date: new Date(),
    imageUrl: "https://hips.hearstapps.com/pop.h-cdn.co/assets/cm/15/05/54cb30f17cdff_-_yardsale-0414-4bhuxf-mdn.jpg?crop=1xw:1.0xh;center,top&resize=768:*",
    createdAt: new Date(),
    updatedAt: new Date(),
   }], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Sales', null, {});
  }
};
