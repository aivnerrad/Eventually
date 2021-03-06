'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Sales', [{
    hostId: 1,
    categoryId: 1,
    streetAddress: "498 Brewery Lane Parkersburg, WV 26101",
    title: "Yard Sale",
    date: new Date(Date.UTC(2021, 11, 20, 13, 0, 0)),
    imageUrl: "https://hips.hearstapps.com/pop.h-cdn.co/assets/cm/15/05/54cb30f17cdff_-_yardsale-0414-4bhuxf-mdn.jpg?crop=1xw:1.0xh;center,top&resize=768:*",
    createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
   },
   {
    hostId: 2,
    categoryId: 2,
    streetAddress: "704 Pennsylvania Ave Rainelle, West Virginia, 25962",
    title: "Garage Sale",
    date: new Date(Date.UTC(2021, 11, 30, 15, 0, 0)),
    imageUrl: "https://www.moneycrashers.com/wp-content/uploads/2020/07/garage-sale-sign-wooden-text-1068x713.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
   },
   {
    hostId: 3,
    categoryId: 3,
    streetAddress: "706 Brentwood Ave Moundsville, West Virginia, 26041",
    title: "Moving Sale",
    date: new Date(Date.UTC(2021, 11, 29, 12, 0, 0)),
    imageUrl: "https://bloximages.newyork1.vip.townnews.com/thepress.net/content/tncms/assets/v3/classifieds/9/4b/94b811b4-99af-11e8-b1f3-afdafb5a88ff/5b68a282c9497.image.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
   },
   {
    hostId: 4,
    categoryId: 4,
    streetAddress: "706 Orchard Ave Glen Dale, West Virginia, 26038",
    title: "Estate Sale",
    date: new Date(Date.UTC(2021, 11, 9, 16, 0, 0)),
    imageUrl: "https://squarecowmovers.com/wp-content/uploads/2013/02/ESTATE-SALE.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 20, 5, 0, 0)),
   },
   {
    hostId: 1,
    categoryId: 5,
    streetAddress: "274 Backus Rd Meadow Bridge, West Virginia, 25976",
    title: "Flea Market",
    date: new Date(Date.UTC(2021, 11, 15, 17, 0, 0)),
    imageUrl: "https://i.pinimg.com/originals/6a/d8/20/6ad8207aafc100fab76214c6f06e33ae.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 15, 7, 0, 0)),
    updatedAt: new Date(Date.UTC(2021, 11, 15, 7, 0, 0)),
   },
   {
    hostId: 1,
    categoryId: 2,
    streetAddress: "501 Fleming Ave Ravenswood, West Virginia, 26164",
    title: "New Garage Sale",
    date: new Date(Date.UTC(2021, 11, 14, 15, 0, 0),),
    imageUrl: "https://pixy.org/src/101/thumbs350/1013859.jpg",
    createdAt: new Date(Date.UTC(2021, 11, 14, 5, 0, 0),),
    updatedAt: new Date(Date.UTC(2021, 11, 14, 5, 0, 0),),
   },
   {
    hostId: 2,
    categoryId: 4,
    streetAddress: "80 Briar Run Dr Ranson, West Virginia, 25438",
    title: "New Estate Sale",
    date: new Date(Date.UTC(2021, 11, 11, 15, 0, 0),),
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLDlwSl91b_BeTFqML8OoOug54brh1zfbSiw&usqp=CAU",
    createdAt: new Date(Date.UTC(2021, 11, 11, 5, 0, 0),),
    updatedAt: new Date(Date.UTC(2021, 11, 11, 5, 0, 0),),
   }], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Sales', null, {
    truncate: true, cascade: true, restartIdentity: true
   });
  }
};
