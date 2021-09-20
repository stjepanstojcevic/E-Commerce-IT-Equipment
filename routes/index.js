const express = require('express');
const router = express.Router();

const AccountRoutes = require('./AccountRoutes');
const ProductRoutes = require('./ProductRoutes');
const OrderRoutes = require('./OrderRoutes');

router.use('/account', AccountRoutes);
router.use('/products', ProductRoutes);
router.use('/orders', OrderRoutes);

module.exports = router;
