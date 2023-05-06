const express = require('express');
const router = express.Router();
const software = require('../controller/software');
const {isAuthenticated} = require('../middleware/isAuthenticated');
// show data in backend
router.get('/', isAuthenticated, software.get_software );

// show data in frontend
router.get('/postDataToFrontEnd', software.post_data_to_front)

router.post('/', software.post_software)

module.exports = router;