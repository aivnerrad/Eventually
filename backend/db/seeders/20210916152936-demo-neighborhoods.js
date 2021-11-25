'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Neighborhoods', [{
     name: "Jefferson",
     imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
     createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
     updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
  },
  {
    name: "Berkeley",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
 },
 {
    name: "Morgan",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
  },
  {
    name: "Hampshire",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
  },
  {
    name: "Pendleton",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
  },
  {
    name: "Kanawha",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Neighborhoods', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
