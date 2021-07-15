const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const dashBdRoutes = require('./dashboardRoutes.js');
const apiRoutes = require('./api/');

router.use('./', homeRoutes);
router.use('./dashboard', dashBdRoutes);
router.use('./api', apiRoutes);

module.exports = router;