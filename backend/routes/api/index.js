const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const salesRouter = require('./sales');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/sales', salesRouter)
module.exports = router;
