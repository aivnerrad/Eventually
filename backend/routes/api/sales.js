const express = require('express');
const asyncHandler = require('express-async-handler');

const { Sale, Neighborhood, Category, Attendee } = require('../../db/models');

const router = express.Router();

//Get sales from DB
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const allNeighborhoods =  await Neighborhood.findAll();
    const allCategories = await Category.findAll();
    const sales = await Sale.findAll();
    if(sales)
      return res.json({
      sales,
      allNeighborhoods,
      allCategories
      });
  }),
);

//Single Sale
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id
    console.log("GET ONE SALE id ----->", id)
    const allSales = await Sale.findAll({
      where: {
        id
      }
    })
    const currentSale = allSales[0];
    if(currentSale)
      return res.json({
      currentSale,
      });
    return res.json({message:"Sale Not Found"})
  }),
);
// Create Sale and Post to DB
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { hostId,
      categoryId,
      neighborhoodId,
      title,
      date,
      imageUrl } = req.body;
    const sale = await Sale.create({ hostId,
      categoryId,
      neighborhoodId,
      title,
      date,
      imageUrl });

    return res.json({
      sale,
    });
  }),
);

//Update a Sale in the DB
router.put(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const { hostId,
      categoryId,
      neighborhoodId,
      title,
      date,
      imageUrl } = req.body;
    const sale = await Sale.update({ hostId,
      categoryId,
      neighborhoodId,
      title,
      date,
      imageUrl });

    return res.json({
      sale,
    });
  }),
);


//Delete Sale From DB
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const sale = await Sale.findByPk(id);
    const attendees = await Attendee.findAll({
      where: {
        saleId: sale.id
      }
    });
    if(sale)
      await attendees.forEach(attendee => {
        attendee.destroy();

      });
      await sale.destroy();
      return res.redirect("/")
  }),
);
module.exports = router;
