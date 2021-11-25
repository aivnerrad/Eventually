'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Neighborhoods', [{
     name: "Jefferson",
     imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
     createdAt: new Date(),
     updatedAt: new Date(),
  },
  {
    name: "Berkeley",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
 },
 {
    name: "Morgan",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Hampshire",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Pendleton",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Kanawha",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Neighborhoods', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
