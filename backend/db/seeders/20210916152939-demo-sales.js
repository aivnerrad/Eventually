'use strict';
const date = new Date(Date.UTC(2021, 11, 16))
const today = date.toLocaleString('en-US')
module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Sales', [{
    hostId: 1,
    categoryId: 1,
    neighborhoodId: 1,
    title: "Yard Sale",
    date: today,
    imageUrl: "https://hips.hearstapps.com/pop.h-cdn.co/assets/cm/15/05/54cb30f17cdff_-_yardsale-0414-4bhuxf-mdn.jpg?crop=1xw:1.0xh;center,top&resize=768:*",
    createdAt: today,
    updatedAt: today,
   },
   {
    hostId: 2,
    categoryId: 2,
    neighborhoodId: 2,
    title: "Garage Sale",
    date: today,
    imageUrl: "https://www.moneycrashers.com/wp-content/uploads/2020/07/garage-sale-sign-wooden-text-1068x713.jpg",
    createdAt: today,
    updatedAt: today,
   },
   {
    hostId: 3,
    categoryId: 3,
    neighborhoodId: 3,
    title: "Moving Sale",
    date: today,
    imageUrl: "https://bloximages.newyork1.vip.townnews.com/thepress.net/content/tncms/assets/v3/classifieds/9/4b/94b811b4-99af-11e8-b1f3-afdafb5a88ff/5b68a282c9497.image.jpg",
    createdAt: today,
    updatedAt: today,
   },
   {
    hostId: 4,
    categoryId: 4,
    neighborhoodId: 4,
    title: "Estate Sale",
    date: today,
    imageUrl: "https://squarecowmovers.com/wp-content/uploads/2013/02/ESTATE-SALE.jpg",
    createdAt: today,
    updatedAt: today,
   },
   {
    hostId: 1,
    categoryId: 5,
    neighborhoodId: 5,
    title: "Flea Market",
    date: today,
    imageUrl: "https://i.pinimg.com/originals/6a/d8/20/6ad8207aafc100fab76214c6f06e33ae.jpg",
    createdAt: today,
    updatedAt: today,
   },
   {
    hostId: 1,
    categoryId: 2,
    neighborhoodId: 4,
    title: "New Garage Sale",
    date: today,
    imageUrl: "https://pixy.org/src/101/thumbs350/1013859.jpg",
    createdAt: today,
    updatedAt: today,
   },
   {
    hostId: 2,
    categoryId: 4,
    neighborhoodId: 1,
    title: "New Estate Sale",
    date: today,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLDlwSl91b_BeTFqML8OoOug54brh1zfbSiw&usqp=CAU",
    createdAt: today,
    updatedAt: today,
   }], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Sales', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
