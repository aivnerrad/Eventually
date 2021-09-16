const express = require('express');
const asyncHandler = require('express-async-handler');

const { Sale, Neighborhood, Category } = require('../../db/models');

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
    const sale = await Sale.findByPk(id);
    if(sale)
      return res.json({
      sale,
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
  '/',
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
    const sale = await Sale.findByPk(id);
    if(sale)
      await sale.destroy();
      return res.json({message: "Deleted Sale"})
  }),
);
module.exports = router;
