'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Categories', [{
     name: "Yard Sale",
     imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
     createdAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
     updatedAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
   },
   {
    name: "Garage Sale",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
  },
  {
    name: "Moving Sale",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
  },
  {
    name: "Estate Sale",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
  },
  {
    name: "Flea Market",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 4, 0, 0)),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Categories', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
