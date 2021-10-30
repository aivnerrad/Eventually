'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Sales', [{
    hostId: 1,
    categoryId: 1,
    neighborhoodId: 1,
    title: "Yard Sale",
    date: new Date().toLocaleString(),
    imageUrl: "https://hips.hearstapps.com/pop.h-cdn.co/assets/cm/15/05/54cb30f17cdff_-_yardsale-0414-4bhuxf-mdn.jpg?crop=1xw:1.0xh;center,top&resize=768:*",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
   },
   {
    hostId: 2,
    categoryId: 2,
    neighborhoodId: 2,
    title: "Garage Sale",
    date: new Date().toLocaleString(),
    imageUrl: "https://www.moneycrashers.com/wp-content/uploads/2020/07/garage-sale-sign-wooden-text-1068x713.jpg",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
   },
   {
    hostId: 3,
    categoryId: 3,
    neighborhoodId: 3,
    title: "Moving Sale",
    date: new Date().toLocaleString(),
    imageUrl: "https://bloximages.newyork1.vip.townnews.com/thepress.net/content/tncms/assets/v3/classifieds/9/4b/94b811b4-99af-11e8-b1f3-afdafb5a88ff/5b68a282c9497.image.jpg",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
   },
   {
    hostId: 4,
    categoryId: 4,
    neighborhoodId: 4,
    title: "Estate Sale",
    date: new Date().toLocaleString(),
    imageUrl: "https://squarecowmovers.com/wp-content/uploads/2013/02/ESTATE-SALE.jpg",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
   },
   {
    hostId: 1,
    categoryId: 5,
    neighborhoodId: 5,
    title: "Flea Market",
    date: new Date().toLocaleString(),
    imageUrl: "https://i.pinimg.com/originals/6a/d8/20/6ad8207aafc100fab76214c6f06e33ae.jpg",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
   },
   {
    hostId: 1,
    categoryId: 2,
    neighborhoodId: 4,
    title: "New Garage Sale",
    date: new Date().toLocaleString(),
    imageUrl: "https://pixy.org/src/101/thumbs350/1013859.jpg",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString().toLocaleString(),
   },
   {
    hostId: 2,
    categoryId: 4,
    neighborhoodId: 1,
    title: "New Estate Sale",
    date: new Date().toLocaleString(),
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLDlwSl91b_BeTFqML8OoOug54brh1zfbSiw&usqp=CAU",
    createdAt: new Date().toLocaleString().toLocaleString(),
    updatedAt: new Date().toLocaleString().toLocaleString(),
   }], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Sales', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
