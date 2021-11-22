const express = require('express');
const asyncHandler = require('express-async-handler')
const { Sale, Neighborhood, Category, Attendee } = require('../../db/models');
const router = express.Router();

//Get all sales from DB
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const allNeighborhoods =  await Neighborhood.findAll();
    const allCategories = await Category.findAll();
    const allAttendees = await Attendee.findAll();
    const currentSales = await Sale.findAll();
    if(currentSales)
      return res.json({
      currentSales,
      allNeighborhoods,
      allCategories,
      allAttendees
      });
  }),
);

//Single Sale
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id
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
  asyncHandler(async (req, res, next) => {
    const { hostId,
      categoryId,
      neighborhoodId,
      title,
      date,
      imageUrl } = req.body;
    console.log("req.body ----->>", req.body)
    const sale = await Sale.create({ hostId,
      categoryId,
      neighborhoodId,
      title,
      date,
      imageUrl })
  }))

//Update a Sale in the DB
router.patch(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id
    const {  hostId,
      categoryId,
      neighborhoodId,
      title,
      date,
      imageUrl  } = req.body;
    const salesArray = await Sale.findAll({
      where: {
        id
      }
    })
    const newSale = await salesArray[0].update({ hostId, categoryId, neighborhoodId, title, date, imageUrl})
    return res.json(newSale);
  }),
);

//Delete Sale From DB
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
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
      return res.json({
        "message": "delete successful"
      })
  }),
);

router.get('/:id(\\d+)/attendees', asyncHandler(async(req, res) => {
  const saleId = req.params.id
  const attendees = await Attendee.findAll({
    where: {
      saleId
    }
  })
  return res.json(attendees)
}))

router.post('/:id(\\d+)/attendees', asyncHandler(async(req, res) => {
  const { userId, saleId } = req.body
  const currentlyAttending = await Attendee.findAll({
    where: {
      userId,
      saleId
    }
  })
  if(currentlyAttending.length === 0){
    await Attendee.create({
      userId,
      saleId
    })
    const attendees = await Attendee.findAll({
      where: {
        saleId
      }
    })
    return res.json(attendees)
  }
  else {
    return res.json({
      "message": "You're already said you're going!"
    })
  }
}))

router.delete('/:id(\\d+)/attendees', asyncHandler(async(req, res) => {
  const { userId, saleId } = req.body
  const like = await Attendee.findOne({
    where: {
      userId,
      saleId
    }
  })
  await like.destroy()

  const attendees = await Attendee.findAll({
    where: {
      saleId
    }
  })

  res.json(attendees.length)
}))

module.exports = router;
