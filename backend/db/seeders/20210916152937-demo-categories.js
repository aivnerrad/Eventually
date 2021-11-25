'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Categories', [{
     name: "Yard Sale",
     imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
    name: "Garage Sale",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Moving Sale",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Estate Sale",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Flea Market",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Categories', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
