const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const salesRouter = require('./sales')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/sales', salesRouter)
module.exports = router;
