const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
// const { route } = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homepageRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;