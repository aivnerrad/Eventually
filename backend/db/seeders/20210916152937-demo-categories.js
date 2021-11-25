'use strict';
const date = new Date(Date.UTC(2021, 11, 16))
const today = date.toLocaleString('en-US')

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Categories', [{
     name: "Yard Sale",
     imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
     createdAt: today,
     updatedAt: today,
   },
   {
    name: "Garage Sale",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: today,
    updatedAt: today,
  },
  {
    name: "Moving Sale",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: today,
    updatedAt: today,
  },
  {
    name: "Estate Sale",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: today,
    updatedAt: today,
  },
  {
    name: "Flea Market",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: today,
    updatedAt: today,
  }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Categories', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
