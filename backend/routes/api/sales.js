const express = require('express');
const asyncHandler = require('express-async-handler')
const { Sale, Category, Attendee } = require('../../db/models');
const router = express.Router();
const {
  singleMulterUpload,
  singlePublicFileUpload
} = require("../../awsS3");
//Get all sales from DB
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const allCategories = await Category.findAll();
    const allAttendees = await Attendee.findAll();
    const currentSales = await Sale.findAll();
    if(currentSales)
      return res.json({
      currentSales,
      allCategories,
      allAttendees
      });
  }),
);

//Single Sale
router.get(
  '/:id',
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
  singleMulterUpload("image"),
  asyncHandler(async (req, res, next) => {
    console.log("REQ.FILE ------->", req.file)
    const saleImageUrl = await singlePublicFileUpload(req.file);
    console.log("SALE IMG URL ----->>>", saleImageUrl)
    const { hostId,
      categoryId,
      streetAddress,
      title,
      date } = req.body;
    const sale = await Sale.create({ hostId,
      categoryId,
      streetAddress,
      title,
      date,
      imageUrl: saleImageUrl })
    return res.json(sale);
  }))
//Update a Sale in the DB
router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id
    const {  hostId,
      categoryId,
      streetAddress,
      title,
      date,
      imageUrl  } = req.body;
    const salesArray = await Sale.findAll({
      where: {
        id
      }
    })
    const newSale = await salesArray[0].update({ hostId, category, title, date, imageUrl})
    return res.json(newSale);
  }),
);

//Delete Sale From DB
router.delete(
  '/:id',
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

router.get('/:id/attendees', asyncHandler(async(req, res) => {
  const saleId = req.params.id
  const attendees = await Attendee.findAll({
    where: {
      saleId
    }
  })
  return res.json(attendees)
}))

router.post('/:id/attendees', asyncHandler(async(req, res) => {
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

router.delete('/:id/attendees', asyncHandler(async(req, res) => {
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
