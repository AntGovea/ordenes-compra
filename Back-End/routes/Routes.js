const { Router } = require('express');

const {
    testApi,
    getAllProducts,
    saveOrder,
    getGrandTotal,
    getTotalByCategory
}
    = require('../controllers/informationController');

const router = Router();

router.get('/', testApi);
router.get('/getAllProducts', getAllProducts);
router.post('/saveOrder', saveOrder);
router.get('/getGrandTotal', getGrandTotal);
router.post('/getTotalByCategory', getTotalByCategory);

module.exports = router;
