'use strict';
const date = new Date(Date.UTC(2021, 11, 16))
const today = date.toLocaleString('en-US')
module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Neighborhoods', [{
     name: "Jefferson",
     imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
     createdAt: today,
     updatedAt: today,
  },
  {
    name: "Berkeley",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: today,
    updatedAt: today,
 },
 {
    name: "Morgan",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: today,
    updatedAt: today,
  },
  {
    name: "Hampshire",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: today,
    updatedAt: today,
  },
  {
    name: "Pendleton",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: today,
    updatedAt: today,
  },
  {
    name: "Kanawha",
    imageUrl: "https://pacresmortgage.com/wp-content/uploads/8.21.20-fam-friendly-1536x1025.jpg",
    createdAt: today,
    updatedAt: today,
  }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Neighborhoods', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
